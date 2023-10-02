import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotersComponent } from './voters.component';
import { StoreModule } from '@ngrx/store';
import { votersReducer } from 'src/app/state/voters/voters.reducer';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { VotersService } from './voters.service';
import { YesNoPipe } from 'src/app/pipes/yes-no.pipe';
import { VOTERS_FEATURE_KEY } from 'src/app/state/voters/voters.store';

@NgModule({
  declarations: [VotersComponent, YesNoPipe],
  exports: [VotersComponent],
  imports: [
    CommonModule,
    NgbAlertModule,
    StoreModule.forFeature(VOTERS_FEATURE_KEY, votersReducer),
  ],
  providers: [VotersService],
})
export class VotersModule {}
