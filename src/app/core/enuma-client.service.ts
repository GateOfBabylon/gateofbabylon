import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ExecutionInput {
  name: string;
  executorValue: string;
}

export interface Execution {
  id: string;
  name: string;
  executor: Record<string, any>;
}

export interface Activation {
  executionId: string;
}

export interface ExecutionResult {
  id: string;
  scriptPath: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'ERROR';
  timestamp: string;
  output: string[];
}

@Injectable({
  providedIn: 'root'
})
export class EnumaClientService {
  private readonly API_URL = 'http://localhost:1337/api/enuma';

  constructor(private httpClient: HttpClient) {
  }

  saveEnumaScript(request: ExecutionInput): Observable<void> {
    return this.httpClient.post<void>(`${this.API_URL}/save`, request);
  }

  runEnumaScript(request: ExecutionInput): Observable<Activation> {
    return this.httpClient.post<Activation>(`${this.API_URL}/run`, request);
  }

  getExecutions(): Observable<Execution[]> {
    return this.httpClient.get<Execution[]>(`${this.API_URL}/executors`);
  }

  getExecutionResult(executionId: string): Observable<ExecutionResult> {
    return this.httpClient.get<ExecutionResult>(`${this.API_URL}/status/${executionId}`);
  }

  getExecutionResultsForExecutor(executionName: string): Observable<ExecutionResult[]> {
    return this.httpClient.get<ExecutionResult[]>(`${this.API_URL}/status/list/${executionName}`);
  }

  deleteExecutor(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${id}`);
  }
}
