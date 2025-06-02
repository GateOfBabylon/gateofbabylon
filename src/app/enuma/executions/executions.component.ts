import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumaClientService, ExecutionResult, Execution } from '../../core/enuma-client.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-executions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './executions.component.html',
  styleUrls: ['./executions.component.scss']
})
export class ExecutionsComponent implements OnInit {
  executionResults$!: Observable<ExecutionResult[]>;
  executorList: Execution[] = [];
  selectedExecutorName: string = '';

  constructor(private enumaClient: EnumaClientService) {}

  ngOnInit(): void {
    this.enumaClient.getExecutions().subscribe((executors) => {
      this.executorList = executors;
      if (executors.length > 0) {
        this.selectedExecutorName = executors[0].name;
        this.loadResults();
      }
    });
  }

  onExecutorChange(): void {
    this.loadResults();
  }

  expandedResultIds = new Set<string>();

  toggleOutput(id: string): void {
    if (this.expandedResultIds.has(id)) {
      this.expandedResultIds.delete(id);
    } else {
      this.expandedResultIds.add(id);
    }
  }

  isExpanded(id: string): boolean {
    return this.expandedResultIds.has(id);
  }


  private loadResults(): void {
    this.executionResults$ = this.enumaClient.getExecutionResultsForExecutor(this.selectedExecutorName);
  }
}
