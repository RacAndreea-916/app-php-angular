import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogServiceService } from '../services/log-service.service';
@Component({
  selector: 'app-add-log',
  template: `
  <div class="big">
    <h2 class="add-btn">Add Log</h2>
    
    <form  (ngSubmit)="onSubmit()">
      <div class="input-div">
        <label for="id">ID:</label>
        <input type="number" id="id" [(ngModel)]="log.id" name="id" required />
      </div>
      <div class="input-div">
        <label for="log_type">Log Type:</label>
        <input type="text" id="log_type" [(ngModel)]="log.type" name="log_type" required />
      </div>
      <div class="input-div">
        <label for="severity">Severity:</label>
        <input type="text" id="severity" [(ngModel)]="log.severity" name="severity" required />
      </div>
      <div class="input-div">
        <label for="date">Date:</label>
        <input type="date" id="date" [(ngModel)]="log.date" name="date" />
      </div>
      <div class="input-div">
        <label for="message">Message:</label>
        <textarea id="message" [(ngModel)]="log.message" name="message" required></textarea>
      </div>
      <button class="add-btn" type="submit">Add Log</button>
    </form>
    </div>
    <button class="back-btn" (click)="onBack()">Back</button> 
  `,
  styleUrls: ['./add-log.component.css']
})
export class AddLogComponent {
  log = {
    id: 0,
    type: '',
    severity: '',
    date: '', // Initially a string
    message: '',
  };

  constructor(private logService: LogServiceService, private router: Router) {}
  onBack() {
    this.router.navigate(['/app-home']); // Navigate back to home
  }

  onSubmit() {
    // Convert the date to ISO 8601 before sending to the backend
    const formattedDate = new Date(this.log.date).toISOString(); // Correct format

    const logData = {
      ...this.log,
      date: formattedDate, // Use the correct date format
    };

    this.logService.addLog(logData).subscribe(
      (response) => {
        if (response.success) {
          console.log('Log added successfully');
          this.router.navigate(['/app-home']); // Navigate to home or another page
        } else {
          console.error('Failed to add log:', response.message);
        }
      },
      (error) => {
        console.error('Error adding log:', error);
      }
    );
  }
}
