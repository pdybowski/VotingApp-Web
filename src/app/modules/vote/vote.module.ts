import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './vote.component';
import { FormsModule } from '@angular/forms';
import { VoteService } from './vote.service';

@NgModule({
  declarations: [VoteComponent],
  exports: [VoteComponent],
  imports: [CommonModule, FormsModule],
  providers: [VoteService],
})
export class VoteModule {}
