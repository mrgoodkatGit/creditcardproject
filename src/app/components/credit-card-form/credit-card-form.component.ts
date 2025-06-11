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
import { forkJoin, map, mergeMap, Subject, takeUntil } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-credit-card-form',
  imports: [ReactiveFormsModule],
  templateUrl: './credit-card-form.component.html',
  styleUrl: './credit-card-form.component.css'
})

export class CreditCardFormComponent {

@Output() formDataEvent = new EventEmitter<any[]>();

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

  creditCardInfo = new CreditCardDto();

  userCrditCardinfo : CreditCardDto[] = [];

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
      //this.userCrditCardinfo.push(this.creditCardInfo);
      this.formDataEvent.emit(this.userCrditCardinfo);  
    }
  }
  
  searchUser(query : string) : void {
    var fetched : CreditCardDto[] = [];
    
    var res = this.creditCardUserService.getCreditCardUser(query)
    .subscribe({
      next: (r) => {
        r.forEach((i) => {
            console.log("Response : " + JSON.stringify(i));
            var temp = JSON.parse(JSON.stringify(i));            

            let dto : CreditCardDto = new CreditCardDto();
            dto.name = temp.UserName;
            dto.number = temp.CreditCardNumber;
            dto.cvv = temp.CVV;
            dto.zipcode = temp.ZipCode;
            dto.month = temp.ExpiryMonth;
            dto.year = temp.ExpiryYear;

            /*
            for(let key in i)
            {
              let value = i[key];
              if (key == "userName")
                dto.name = value;
              else if (key == "creditCardNumber")
                dto.number = value;
              else if (key == "zipCode")
                dto.zipcode = value;
              else if (key == "cvv")
                dto.cvv = value;
              else if (key == "expiryYear")
                dto.year = value;
              else if (key == "expiryMonth")
                dto.month = value;
            }*/
            fetched.push(dto);

        });
      },
      error: error => console.log("error : " + error),
      complete: () => {        
        this.creditCardForm.controls['name'].setValue(fetched[0].name);    
        this.creditCardForm.controls['number'].setValue(fetched[0].number);    
        this.creditCardForm.controls['month'].setValue(fetched[0].month);    
        this.creditCardForm.controls['year'].setValue(fetched[0].year);    
        this.creditCardForm.controls['cvv'].setValue(fetched[0].cvv);    
        this.creditCardForm.controls['zipcode'].setValue(fetched[0].zipcode);  
        
        console.log("Number of records : " + this.userCrditCardinfo.length);
        this.userCrditCardinfo = fetched;
        this.formDataEvent.emit(this.userCrditCardinfo);
      }
        
    });     
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

    /*this.formDataEvent.emit(
      {
        name : this.creditCardForm.controls['name'].value,
        number : this.creditCardForm.controls['number'].value,
        month : this.creditCardForm.controls['month'].value,
        year : this.creditCardForm.controls['year'].value,
        cvv : this.creditCardForm.controls['cvv'].value,
        zipcode : this.creditCardForm.controls['zipcode'].value
      } as CreditCardDto
    );*/
    this.userCrditCardinfo.push(captured);
    this.formDataEvent.emit(this.userCrditCardinfo);

    let res = this.creditCardUserService.saveCreditCardUser(captured).subscribe(
      {
        next: () => { console.log("Task done"); },
        error: (er) => {console.log("Error Occured : " + er);},
        complete: () => {res.unsubscribe();}
      }
    );   
    
  }  
}
