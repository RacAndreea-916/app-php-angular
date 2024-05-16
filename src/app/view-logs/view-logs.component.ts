import { Component, OnInit } from '@angular/core';
import { LogServiceService } from '../services/log-service.service';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-view-logs',
  template: `
  
  <app-filtered-logs class = "filtering" (filtersApplied)="onApplyFilters($event)"></app-filtered-logs>
    <div class="logs-div" *ngFor="let log of logs">
      {{ log.LogRequestId }} - Type: {{ log.Type }} - Severity: {{log.Severity}} - Message {{ log.Log }}
      
    </div>
    <div class="bottom">
    <app-pagination class="pagination"
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      (pageChange)="onPageChange($event)"
    ></app-pagination>
    <button (click)="onBack()">Back</button> </div>
  `,
  styleUrls: ['./view-logs.component.css'],
})
export class ViewLogsComponent implements OnInit {
  logs: any[] = [];
  currentPage = 1; 
  totalPages!: number; 

  constructor(private logsService: LogServiceService, private router: Router) {}

  ngOnInit() {
    this.fetchLogs(this.currentPage);
  }

  fetchLogs(page: number) {
    this.logsService.getLogs(page).subscribe(
      (response: any) => {
        this.logs = response.logs; 
        const totalCount = response.totalCount; 
        this.totalPages = Math.ceil(totalCount / 4);
      },
      (error) => {
        console.error('Error fetching logs:', error);
      }
    );
  }
  
  onApplyFilters(event: { type: string; severity: string }) {
    const { type, severity } = event; 
    this.logsService.getFilteredLogs(1, type, severity).subscribe(
      (response: any) => {
        this.logs = response; 
      },
      (error) => {
        console.error('Error fetching filtered logs:', error);
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchLogs(page);
  }

  

  onBack() {
    
    this.router.navigate(['/app-home']); 
  
  }
}
