import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  template: `
    <button (click)="goToPrevious()" [disabled]="currentPage === 1">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button (click)="goToNext()" [disabled]="currentPage === totalPages">Next</button>
  `,
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() currentPage!: number; // Current page number
  @Input() totalPages!: number; // Total number of pages

  @Output() pageChange = new EventEmitter<number>(); // Event to notify parent component

  goToPrevious() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  goToNext() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }
}

