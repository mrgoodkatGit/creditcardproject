import { Injectable } from '@angular/core';
import { CreditcardType } from '../data/creditCardType.interface';
import { CreditcardTypeData } from '../data/creditCardTypeData';

@Injectable({
  providedIn: 'root'
})
export class CreditcardTypesService {

  private data : CreditcardTypeData;
  constructor() { 
    this.data = new CreditcardTypeData();
  }

  getAllCreditCardTypes() : CreditcardType[]{
    //return CreditcardTypeData.getData();    
    return this.data.getData();
  }
}
