import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { NewUserDialogComponent } from 'src/app/components';
import { AppState } from 'src/app/state/app.state';
import * as VoterAction from 'src/app/state/voters/voters.actions';
import * as VoterSelector from 'src/app/state/voters/voters.selectors';
import { BaseUser } from 'src/app/models';

@Component({
  selector: 'voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VotersComponent implements OnInit {
  voters$ = this.store.select(VoterSelector.selectAllVoters);
  loading$ = this.store.pipe(map((status) => status.voters.isLoading));
  addingNew$ = this.store.pipe(map((status) => status.voters.isAddignNew));
  error$ = this.store.pipe(map((status) => status.voters.error || null));

  constructor(private store: Store<AppState>, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.store.dispatch(VoterAction.loadVoters());
  }

  onAddNewVoterClicked() {
    this.modalService.dismissAll();

    const modalRef = this.modalService.open(NewUserDialogComponent);
    modalRef.componentInstance.type = 'Voter';
    modalRef.componentInstance.save.subscribe((newVoter: BaseUser) => {
      this.store.dispatch(VoterAction.addVoter(newVoter));
    });
  }
}
