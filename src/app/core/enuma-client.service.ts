import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ExecutionRequestInput {
  name: string;
  executor: string;
}

export interface ExecutionRequest {
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
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED';
  output: string[];
}

@Injectable({
  providedIn: 'root'
})
export class EnumaClientService {
  private readonly API_URL = 'http://localhost:1337/api/enuma';

  constructor(private httpClient: HttpClient) {
  }

  saveEnumaScript(request: ExecutionRequestInput): Observable<void> {
    return this.httpClient.post<void>(`${this.API_URL}/save`, request);
  }

  runEnumaScript(request: ExecutionRequestInput): Observable<Activation> {
    return this.httpClient.post<Activation>(`${this.API_URL}/run`, request);
  }

  getExecutionRequestList(): Observable<ExecutionRequest[]> {
    return this.httpClient.get<ExecutionRequest[]>(`${this.API_URL}/executors`);
  }

  getExecutionResult(executionId: string): Observable<ExecutionResult> {
    return this.httpClient.get<ExecutionResult>(`${this.API_URL}/status/${executionId}`);
  }

  getExecutionResultsForExecutor(executionName: string): Observable<ExecutionResult[]> {
    return this.httpClient.get<ExecutionResult[]>(`${this.API_URL}/status/list/${executionName}`);
  }
}
