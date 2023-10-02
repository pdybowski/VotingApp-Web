import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from 'src/app/models';

@Injectable()
export class CandidatesService {
  constructor(private httpClient: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this.httpClient.get<Candidate[]>(
      'http://localhost:27017/api/candidates'
    );
  }

  addCandidate(
    candidate: Omit<Candidate, 'id' | 'votes'>
  ): Observable<Candidate> {
    return this.httpClient.post<Candidate>(
      'http://localhost:27017/api/candidates',
      candidate
    );
  }
}
