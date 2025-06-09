import { Component, inject, Output } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { CreditCardDto } from '../../data/creditCardDto.interface';
import { CreditCardValidator } from './creditCardValidator';
import { CreditCardExpiryMonthValidator } from './creditCardExpiryMonthValidator';
import { CreditCardExpiryYearValidator } from './creditCardExpiryYearValidator';
import { NumberValidator } from './numberValidator';
import { CreditcarduserService } from '../../services/creditcarduser.service';
import { error } from 'node:console';

@Component({
  selector: 'app-credit-card-form',
  imports: [ReactiveFormsModule],
  templateUrl: './credit-card-form.component.html',
  styleUrl: './credit-card-form.component.css'
})

export class CreditCardFormComponent {

@Output() formDataEvent = new EventEmitter<any>();

creditCardUserService : CreditcarduserService;

  creditCardForm = new FormGroup(
    {
      name : new FormControl('', [Validators.required, Validators.minLength(7), Validators.required]),
      number : new FormControl('', [Validators.minLength(16), CreditCardValidator(), Validators.required]),
      month : new FormControl('', [Validators.maxLength(2), CreditCardExpiryMonthValidator(), NumberValidator(), Validators.required]),
      year : new FormControl('', [Validators.minLength(4), Validators.maxLength(4), CreditCardExpiryYearValidator(), NumberValidator(), Validators.required]),
      cvv : new FormControl('', [Validators.minLength(3), Validators.maxLength(4), NumberValidator(), Validators.required]),
      zipcode : new FormControl('', [Validators.maxLength(5), Validators.minLength(5), NumberValidator(), Validators.required]),
    }
  );

  creditCardInfo  = new CreditCardDto();

  constructor()
  {
    this.creditCardUserService = inject(CreditcarduserService);
  }

  ngOnInit() : void {
    this.creditCardForm.controls['name'].valueChanges.subscribe(changes => this.captureValueChange(changes, 'name'));
    this.creditCardForm.controls['number'].valueChanges.subscribe(changes => this.captureValueChange(changes, 'number'));
    this.creditCardForm.controls['month'].valueChanges.subscribe(changes => this.captureValueChange(changes, 'month'));
    this.creditCardForm.controls['year'].valueChanges.subscribe(changes => this.captureValueChange(changes, 'year'));
    this.creditCardForm.controls['cvv'].valueChanges.subscribe(changes => this.captureValueChange(changes, 'cvv'));
    this.creditCardForm.controls['zipcode'].valueChanges.subscribe(changes => this.captureValueChange(changes, 'zipcode'));
  }  

  captureValueChange(changes : any, controlType : string)
  {
    if (changes != null)
    {  
      switch(controlType)
      { 
        case "name": {   
          this.creditCardInfo.name = changes;
          break;
        }
        case "number": {   
          this.creditCardInfo.number = changes;
          break;
        }
        case "month": {   
          this.creditCardInfo.month = changes;
          break;
        }
        case "year": {   
          this.creditCardInfo.year = changes;
          break;
        }
        case "cvv": {   
          this.creditCardInfo.cvv = changes;
          break;
        }
        case "zipcode": {   
          this.creditCardInfo.zipcode = changes;
          break;
        }
        default : {
          break;
        }
      }
      this.formDataEvent.emit(this.creditCardInfo);  
    }
  }
  
  searchUser(query : string) : void {
    var res = this.creditCardUserService.getCreditCardUser(query).subscribe(
      (response) => { console.log("sucess : " + res);},
      (error) => { console.log("error : " + error);}
    );
    console.log(res);
  }

  onSubmit(){
    let captured = {
      name : this.creditCardForm.controls['name'].value,
      number : this.creditCardForm.controls['number'].value,
      month : this.creditCardForm.controls['month'].value,
      year : this.creditCardForm.controls['year'].value,
      cvv : this.creditCardForm.controls['cvv'].value,
      zipcode : this.creditCardForm.controls['zipcode'].value
    } as CreditCardDto;

    this.formDataEvent.emit(
      {
        name : this.creditCardForm.controls['name'].value,
        number : this.creditCardForm.controls['number'].value,
        month : this.creditCardForm.controls['month'].value,
        year : this.creditCardForm.controls['year'].value,
        cvv : this.creditCardForm.controls['cvv'].value,
        zipcode : this.creditCardForm.controls['zipcode'].value
      } as CreditCardDto
    );

    let res = this.creditCardUserService.saveCreditCardUser(captured).subscribe(
      (response) => {
        console.log("Api called : ", response);
      },
      (error) => {
        console.log("Error Occured : ", error);
      }
    );
    
    console.warn(this.creditCardForm.controls['name'].value);
  }  
}
