import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { StoreModule } from '@ngrx/store';
import { candidateReducer } from 'src/app/state/candidates/candidates.reducer';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CandidatesService } from './candidates.service';
import { CANDIDATES_FEATURE_KEY } from 'src/app/state/candidates/candidates.store';

@NgModule({
  declarations: [CandidatesComponent],
  exports: [CandidatesComponent],
  imports: [
    CommonModule,
    NgbAlertModule,
    StoreModule.forFeature(CANDIDATES_FEATURE_KEY, candidateReducer),
  ],
  providers: [CandidatesService],
})
export class CandidatesModule {}
