import { Injectable } from '@angular/core';
import { of, map, catchError, switchMap } from 'rxjs';
import * as VoterAction from './voters.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VotersService } from 'src/app/modules/voters/voters.service';

@Injectable()
export class VotersEffects {
  constructor(private action$: Actions, private votersService: VotersService) {}

  loadVoters$ = createEffect(() =>
    this.action$.pipe(
      ofType(VoterAction.loadVoters),
      switchMap(() =>
        this.votersService.getVoters().pipe(
          map((voters) =>
            VoterAction.loadVotersSuccess({
              voters: voters,
            })
          ),
          catchError((error) =>
            of(
              VoterAction.loadVotersFailure({
                error: error?.message,
              })
            )
          )
        )
      )
    )
  );

  addVoter$ = createEffect(() =>
    this.action$.pipe(
      ofType(VoterAction.addVoter),
      switchMap((voter) =>
        this.votersService.addVoter(voter).pipe(
          map((voter) => VoterAction.addVoterSuccess(voter)),
          catchError((error) =>
            of(VoterAction.addVoterFailure({ error: error }))
          )
        )
      )
    )
  );
}
