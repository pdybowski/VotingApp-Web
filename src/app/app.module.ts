import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CandidatesModule } from './modules/candidates/candidates.module';
import { VotersModule } from './modules/voters/voters.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { VoteModule } from './modules/vote/vote.module';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CandidateEffects } from './state/candidates/candidates.effects';
import { EffectsModule } from '@ngrx/effects';
import { VotersEffects } from './state/voters/voters.effects';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CandidatesModule,
    VotersModule,
    VoteModule,
    FormsModule,
    NgbAlertModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    NgbModule,
    HttpClientModule,
    EffectsModule.forRoot([VotersEffects, CandidateEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
