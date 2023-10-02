import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NewUserDialogComponent } from 'src/app/components';
import { BaseUser, Candidate } from 'src/app/models';
import { AppState } from 'src/app/state/app.state';
import * as CandidateAction from 'src/app/state/candidates/candidates.actions';
import * as CandidateSelector from 'src/app/state/candidates/candidates.selectors';

@Component({
  selector: 'candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesComponent implements OnInit {
  candidates$ = this.store.select(CandidateSelector.selectAllCandidates);
  loading$ = this.store.pipe(map((status) => status.candidates.isLoading));
  addingNew$ = this.store.pipe(map((status) => status.candidates.isAddingNew));
  error$ = this.store.pipe(map((status) => status.candidates.error || null));

  constructor(private store: Store<AppState>, private modalService: NgbModal) {}

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
