import { Component, OnInit } from '@angular/core';
import { LogServiceService } from '../services/log-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logs',
  template: `
    
    <div class="logs-div" *ngFor="let log of logs">
    {{ log.LogRequestId }} - Type: {{ log.Type }} - Severity: {{log.Severity}} - Message {{ log.Log }}
      <button (click)="onDelete(log.LogRequestId)">Delete</button> <!-- Delete button -->
    </div>
    <button (click)="onBack()">Back</button>
  `,
  styleUrls: ['./user-logs.component.css'],
})
export class UserLogsComponent implements OnInit {
  logs: any[] = [];

  constructor(private logsService: LogServiceService, private router: Router) {}

  ngOnInit() {
    this.fetchUserLogs(); // Fetch user-specific logs when the component initializes
  }

  fetchUserLogs() {
    this.logsService.getUserLogs().subscribe(
      (response: any) => {
        this.logs = response; // Store the fetched logs
      },
      (error) => {
        console.error('Error fetching user logs:', error); // Handle errors
      }
    );
  }

  onDelete(logRequestId: number) {
    if (confirm("Are you sure you want to delete this log?")) { // Confirm before deleting
      this.logsService.deleteLog(logRequestId).subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Log deleted successfully');
            this.fetchUserLogs(); // Refresh logs after deletion
          } else {
            console.error('Failed to delete log:', response.message);
          }
        },
        (error) => {
          console.error('Error deleting log:', error); // Handle errors
        }
      );
    }
  }

  onBack() {
    this.router.navigate(['/app-home']); // Navigate back to home
  }
}
