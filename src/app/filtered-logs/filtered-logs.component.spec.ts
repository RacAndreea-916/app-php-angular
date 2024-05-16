import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredLogsComponent } from './filtered-logs.component';

describe('FilteredLogsComponent', () => {
  let component: FilteredLogsComponent;
  let fixture: ComponentFixture<FilteredLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilteredLogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilteredLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
