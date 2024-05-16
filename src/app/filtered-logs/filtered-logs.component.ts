import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtered-logs',
  template: `
    <div>
      <label for="type">Type:</label>
      <input id="type" [(ngModel)]="type" />
      <label for="severity">Severity:</label>
      <input id="severity" [(ngModel)]="severity" />
      <button (click)="applyFilters()">Apply Filters</button>
    </div>
  `,
})
export class FilteredLogsComponent {
  type: string = ''; 
  severity: string = ''; 

  @Output() filtersApplied = new EventEmitter<{ type: string; severity: string }>(); 

  applyFilters() {
    this.filtersApplied.emit({ type: this.type, severity: this.severity });
  }
}
