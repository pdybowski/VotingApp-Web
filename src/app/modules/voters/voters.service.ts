import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Voter } from 'src/app/models';

@Injectable()
export class VotersService {
  constructor(private httpClient: HttpClient) {}

  getVoters(): Observable<Voter[]> {
    return this.httpClient.get<Voter[]>('http://localhost:27017/api/voters');
  }

  addVoter(voter: Omit<Voter, 'id' | 'hasVoted'>): Observable<Voter> {
    return this.httpClient.post<Voter>(
      'http://localhost:27017/api/voters',
      voter
    );
  }
}
