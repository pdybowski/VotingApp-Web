import * as CandidateAction from './candidates.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CandidatesService } from 'src/app/modules/candidates/candidates.service';

@Injectable()
export class CandidateEffects {
  constructor(
    private action$: Actions,
    private candidatesService: CandidatesService
  ) {}

  loadCandidates$ = createEffect(() =>
    this.action$.pipe(
      ofType(CandidateAction.loadCandidates),
      switchMap(() =>
        this.candidatesService.getCandidates().pipe(
          map((candidates) =>
            CandidateAction.loadCandidatesSuccess({
              candidates: candidates,
            })
          ),
          catchError((error) =>
            of(CandidateAction.loadCandidatesFailure({ error: error?.message }))
          )
        )
      )
    )
  );

  addCandidate$ = createEffect(() =>
    this.action$.pipe(
      ofType(CandidateAction.addCandidate),
      switchMap((candidate) =>
        this.candidatesService.addCandidate(candidate).pipe(
          map((candidate) => CandidateAction.addCandidateSuccess(candidate)),
          catchError((error) =>
            of(CandidateAction.addCandidateFailure({ error: error?.message }))
          )
        )
      )
    )
  );
}
