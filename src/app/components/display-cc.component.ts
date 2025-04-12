import { Component, inject, OnInit } from '@angular/core';
import { CreditcardTypesService } from '../services/creditcard-types.service'
import { CreditcardType } from '../data/creditCardType.interface';
import { NgFor } from '@angular/common';
import { CreditCardFormComponent } from '../components/credit-card-form/credit-card-form.component'

@Component({
  selector: 'app-display-cc',
  imports: [NgFor, CreditCardFormComponent],
  templateUrl: './display-cc.component.html',
  styleUrl: './display-cc.component.css'
})
export class DisplayCCComponent implements OnInit {
    
    creditCardService : CreditcardTypesService;    

    creditCardTypes : CreditcardType[] = [];

    constructor(){
      this.creditCardService = inject(CreditcardTypesService);
    }

    ngOnInit(): void {
      this.creditCardTypes = this.creditCardService.getAllCreditCardTypes();
    }
}
