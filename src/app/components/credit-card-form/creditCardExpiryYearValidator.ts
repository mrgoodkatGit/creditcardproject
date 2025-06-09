import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { DatePipe } from '@angular/common';

export function CreditCardExpiryYearValidator() : ValidatorFn{
    return(control:AbstractControl): ValidationErrors | null => {

        const value = control.value;
        if (!value){
            return null;
        }

        if (!value){ return null; }
        
        let yr = new Date().getFullYear();
        
        if (isNaN(+value) || value < yr){
            console.log("Value : " + value);
            console.log("LOg : " + "invalidYear");
            return {invalidYear : true};
        }    
        
        return null;
    }
}