import {Component, Inject} from '@angular/core';
import {EnumaClientService, ExecutionResult} from '../../core/enuma-client.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-execution-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './execution-dialog.component.html',
  styleUrls: ['./execution-dialog.component.scss']
})
export class ExecutionDialogComponent {
  executionResult?: ExecutionResult;
  loading = false;
  error = '';

  constructor(
    private enumaClient: EnumaClientService,
    private dialogRef: MatDialogRef<ExecutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public executionId: string
  ) {
    this.refreshExecutionResult();
  }

  refreshExecutionResult(): void {
    this.loading = true;
    this.error = '';

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
}
