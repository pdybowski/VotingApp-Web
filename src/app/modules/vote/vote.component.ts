import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Candidate, Voter } from 'src/app/models';
import { AppState } from 'src/app/state/app.state';
import * as CandidateAction from 'src/app/state/candidates/candidates.actions';
import * as CandidateSelector from 'src/app/state/candidates/candidates.selectors';
import * as VoterAction from 'src/app/state/voters/voters.actions';
import * as VoterSelector from 'src/app/state/voters/voters.selectors';
import { VoteService } from './vote.service';

@Component({
  selector: 'vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VoteComponent {
  @ViewChild('voteForm')
  voteForm: NgForm | null = null;

  selectedVoterId: string | null = null;
  selectedCandidateId: string | null = null;
  isVoting: boolean = false;

  candidates$ = this.store.select(CandidateSelector.selectAllCandidates);
  voters$ = this.store.select(VoterSelector.selectNonVotedVoters);

  constructor(
    private store: Store<AppState>,
    private voteService: VoteService
  ) {}

  onVoteClicked() {
    if (!this.voteForm) return;
    this.voteForm.form.markAllAsTouched();
    if (!this.voteForm.valid) return;

    this.vote();
  }

  trackByFn(index: number, user: Candidate | Voter) {
    return user.id;
  }

  private vote() {
    this.isVoting = true;
    this.voteService
      .addVote({
        voterId: this.selectedVoterId!,
        candidateId: this.selectedCandidateId!,
      })
      .subscribe({
        next: () => {
          this.store.dispatch(
            CandidateAction.addVote({ id: this.selectedCandidateId! })
          );
          this.store.dispatch(
            VoterAction.addVote({ id: this.selectedVoterId! })
          );

          this.cleanUp();
        },
      })
      .add(() => {
        this.isVoting = false;
      });
  }

  private cleanUp() {
    this.selectedVoterId = null;
    this.selectedCandidateId = null;
  }
}
