import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-credit-card-form',
  imports: [ReactiveFormsModule],
  templateUrl: './credit-card-form.component.html',
  styleUrl: './credit-card-form.component.css'
})
export class CreditCardFormComponent {
  name = new FormControl('');
  number = new FormControl('');
  month = new FormControl('');
  year = new FormControl('');
  cvv = new FormControl('');
  zipcode = new FormControl('');
}
