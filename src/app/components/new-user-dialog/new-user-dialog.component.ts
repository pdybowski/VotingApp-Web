import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseUser } from 'src/app/models';

@Component({
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class NewUserDialogComponent {
  @Input()
  type: string | null = null;

  @Output()
  save = new EventEmitter<BaseUser>();

  @ViewChild('newUserForm')
  newUserForm: NgForm | null = null;

  service: any;

  user: BaseUser;
  isSaving: boolean = false;

  constructor(public activeModal: NgbActiveModal) {
    this.user = {
      firstName: '',
      lastName: '',
    };
  }

  onSubmitClicked() {
    if (!this.newUserForm) return;
    this.newUserForm.form.markAllAsTouched();
    if (!this.newUserForm.valid) return;

    this.save.emit(this.user);
  }
}
