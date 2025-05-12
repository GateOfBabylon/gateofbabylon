import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {EnumaClientService, ExecutionRequestInput} from '../../core/enuma-client.service';
import * as yaml from 'js-yaml';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-executor-dialog',
  imports: [
    FormsModule
  ],
  templateUrl: './create-executor-dialog.component.html',
  styleUrl: './create-executor-dialog.component.scss'
})
export class CreateExecutorDialogComponent {
  name = '';
  executorYaml = '';

  constructor(
    protected dialogRef: MatDialogRef<CreateExecutorDialogComponent>,
    private enumaClient: EnumaClientService
  ) {
  }

  createExecutor(): void {
    try {
      const executor = yaml.load(this.executorYaml);
      const request: ExecutionRequestInput = {
        name: this.name,
        executor: JSON.stringify(executor)
      };
      this.enumaClient.saveEnumaScript(request).subscribe({
        next: () => {
          alert('Executor created successfully');
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Failed to create executor:', err);
          alert('Failed to create executor');
        }
      });
    } catch (e) {
      alert('Invalid YAML syntax');
    }
  }
}
