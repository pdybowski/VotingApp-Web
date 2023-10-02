import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NewUserDialogComponent } from 'src/app/components';
import { BaseUser, Candidate } from 'src/app/models';
import { AppState } from 'src/app/state/app.state';
import * as CandidateAction from 'src/app/state/candidates/candidates.actions';
import * as CandidateSelector from 'src/app/state/candidates/candidates.selectors';
import { CandidatesService } from './candidates.service';

@Component({
  selector: 'candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CandidatesComponent implements OnInit {
  candidates$ = this.store.select(CandidateSelector.selectAllCandidates);
  loading$ = this.store.pipe(map((status) => status.candidates.isLoading));
  error$ = this.store.pipe(map((status) => status.candidates.error || null));

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
    private candidatesService: CandidatesService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(CandidateAction.loadCandidates());
  }

  onAddNewCandidateClicked() {
    this.modalService.dismissAll();

    const modalRef = this.modalService.open(NewUserDialogComponent);
    modalRef.componentInstance.type = 'Candidate';
    modalRef.componentInstance.save.subscribe((newCandidate: BaseUser) => {
      this.addCandidate(modalRef, newCandidate);
    });
  }

  trackByFn(index: number, candidate: Candidate) {
    return candidate.id;
  }

  private addCandidate(modalRef: NgbModalRef, newCandidate: BaseUser) {
    modalRef.componentInstance.isSaving = true;
    this.candidatesService
      .addCandidate(newCandidate)
      .subscribe({
        next: (candidate) => {
          this.store.dispatch(CandidateAction.addCandidate(candidate));
        },
      })
      .add(() => {
        modalRef.componentInstance.isSaving = false;
        modalRef.close();
      });
  }
}
