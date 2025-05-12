import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionDialogComponent } from './execution-dialog.component';

describe('ExecutionDialogComponent', () => {
  let component: ExecutionDialogComponent;
  let fixture: ComponentFixture<ExecutionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
