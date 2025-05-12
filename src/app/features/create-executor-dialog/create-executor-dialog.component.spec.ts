import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExecutorDialogComponent } from './create-executor-dialog.component';

describe('CreateExecutorDialogComponent', () => {
  let component: CreateExecutorDialogComponent;
  let fixture: ComponentFixture<CreateExecutorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExecutorDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExecutorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
