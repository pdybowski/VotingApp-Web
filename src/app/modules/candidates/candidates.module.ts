import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatesComponent } from './candidates.component';
import { StoreModule } from '@ngrx/store';
import { candidateReducer } from 'src/app/state/candidates/candidates.reducer';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CandidatesService } from './candidates.service';

@NgModule({
  declarations: [CandidatesComponent],
  exports: [CandidatesComponent],
  imports: [
    CommonModule,
    NgbAlertModule,
    StoreModule.forFeature('candidates', candidateReducer),
  ],
  providers: [CandidatesService],
})
export class CandidatesModule {}
