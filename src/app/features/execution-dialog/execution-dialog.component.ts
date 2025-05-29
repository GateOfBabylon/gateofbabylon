import {Component, Inject, OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {interval, Subscription, switchMap, catchError, of} from 'rxjs';
import {EnumaClientService, ExecutionResult} from '../../core/enuma-client.service';

@Component({
  selector: 'app-execution-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './execution-dialog.component.html',
  styleUrls: ['./execution-dialog.component.scss']
})
export class ExecutionDialogComponent implements OnDestroy {
  executionResult?: ExecutionResult;
  loading = false;
  error = '';
  private pollingSub?: Subscription;

  constructor(
    private enumaClient: EnumaClientService,
    private dialogRef: MatDialogRef<ExecutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public executionId: string
  ) {
    this.startPolling();
  }

  private startPolling(): void {
    this.loading = true;
    this.pollingSub = interval(1000)
      .pipe(
        switchMap(() =>
          this.enumaClient.getExecutionResult(this.executionId).pipe(
            catchError(err => {
              console.error('Failed to fetch execution result:', err);
              this.error = 'Failed to fetch execution result';
              return of(undefined);
            })
          )
        )
      )
      .subscribe(result => {
        this.loading = false;
        if (result) {
          this.executionResult = result;
        }
      });
  }

  refreshExecutionResult(): void {
    this.loading = true;
    this.enumaClient.getExecutionResult(this.executionId).subscribe({
      next: (result) => {
        this.executionResult = result;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch execution result:', err);
        this.error = 'Failed to fetch execution result';
        this.loading = false;
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.pollingSub?.unsubscribe();
  }
}
