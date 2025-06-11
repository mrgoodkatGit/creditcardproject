import { Component, inject, OnInit } from '@angular/core';
import { CreditcardTypesService } from '../services/creditcard-types.service'
import { CreditcardType } from '../data/creditCardType.interface';
import { CreditCardDto } from '../data/creditCardDto.interface';
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

    creditCardData = new CreditCardDto();

    userCreditCardData : CreditCardDto[] = [];

    constructor(){
      this.creditCardService = inject(CreditcardTypesService);
    }

    ngOnInit(): void {
      this.creditCardTypes = this.creditCardService.getAllCreditCardTypes();
    }

    getCreditCardData(data : any[]){     
      this.userCreditCardData = data;
      console.log("Emitted array : " + data.length); 
      console.log("Array length : " + this.userCreditCardData.length); 
      this.creditCardData = data[0] as CreditCardDto;      
    }

    public getCreditCardImage() : string {

      let startingNumber : string = "";
      //console.log("Number : " + this.creditCardData.number);
      startingNumber = this.creditCardData.number.substring(0, 1);

      switch (startingNumber)
      {
          case "3" :
            return "amxCC.jpg";
            break;
          case "4" :
            return "visaCC.jpg";
            break;
          case "5" :
            return "mastercardCC.jpg";
            break;
          case "6" :
            return "discoverCC.jpg";
            break;
          default : 
            return "visaCC.jpg";
            break;
      }
    }
}

