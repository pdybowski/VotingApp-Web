import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class VoteService {
  constructor(private httpClient: HttpClient) {}

  addVote({ voterId, candidateId }: AddVoteRequest): Observable<null> {
    return this.httpClient.patch<never>(
      `http://localhost:27017/api/votes/${voterId}/${candidateId}`,
      null
    );
  }
}

type AddVoteRequest = { voterId: string; candidateId: string };
