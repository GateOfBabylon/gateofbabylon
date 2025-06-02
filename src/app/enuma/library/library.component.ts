import {Component, OnInit} from '@angular/core';
import {NgForOf, AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {EnumaClientService, Execution} from '../../core/enuma-client.service';
import * as yaml from 'js-yaml';
import {ExecutionDialogComponent} from '../../features/execution-dialog/execution-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateExecutorDialogComponent} from '../../features/create-executor-dialog/create-executor-dialog.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [NgForOf, AsyncPipe],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  executors$!: Observable<Execution[]>;

  constructor(
    private enumaClient: EnumaClientService,
    private dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    this.executors$ = this.enumaClient.getExecutions();
  }

  getFormattedExecutor(executor: Record<string, any>): string {
    return yaml.dump(executor);
  }

  runExecutor(executorName: string): void {
    const request = {name: executorName, executorValue: ''};

    this.enumaClient.runEnumaScript(request).subscribe({
      next: (activation) => {
        console.log(`Execution started! ID: ${activation.executionId}`);

        this.dialog.open(ExecutionDialogComponent, {
          data: activation.executionId,
          width: '600px'
        });
      },
      error: (err) => {
        console.error('Failed to start execution:', err);
        window.alert('Failed to start execution. Please try again.');
      }
    });
  }

  openCreateExecutorDialog(): void {
    const dialogRef = this.dialog.open(CreateExecutorDialogComponent, {
      width: '6000px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.executors$ = this.enumaClient.getExecutions();
    });
  }

  deleteExecutor(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this executor?');

    if (!confirmed) return;

    this.enumaClient.deleteExecutor(id).subscribe({
      next: () => {
        this.executors$ = this.enumaClient.getExecutions(); // refresh after delete
      },
      error: (err) => {
        console.error('Failed to delete executor:', err);
        alert('Failed to delete executor. Please try again.');
      }
    });
  }
}
