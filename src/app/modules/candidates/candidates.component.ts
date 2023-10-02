import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { NewUserDialogComponent } from 'src/app/components';
import { BaseUser, Candidate } from 'src/app/models';
import * as CandidateAction from 'src/app/state/candidates/candidates.actions';
import * as CandidateSelector from 'src/app/state/candidates/candidates.selectors';
import { CandidatesState } from 'src/app/state/candidates/candidates.store';

@Component({
  selector: 'candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesComponent implements OnInit {
  candidates$ = this.store.select(CandidateSelector.selectAllCandidates);
  loading$ = this.store.select(CandidateSelector.selectIsAllCandidatesLoading);
  addingNew$ = this.store.select(CandidateSelector.selectIsCandidateAdding);
  error$ = this.store.select(CandidateSelector.selectError);

  constructor(
    private store: Store<CandidatesState>,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CandidateAction.loadCandidates());
  }

  onAddNewCandidateClicked() {
    this.modalService.dismissAll();

    const modalRef = this.modalService.open(NewUserDialogComponent);
    modalRef.componentInstance.type = 'Candidate';
    modalRef.componentInstance.save.subscribe((newCandidate: BaseUser) => {
      this.store.dispatch(CandidateAction.addCandidate(newCandidate));
    });
  }

  trackByFn(index: number, candidate: Candidate) {
    return candidate.id;
  }
}
