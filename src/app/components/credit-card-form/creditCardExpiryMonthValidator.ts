import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function CreditCardExpiryMonthValidator() : ValidatorFn{
    return(control:AbstractControl): ValidationErrors | null => {

        const value = control.value;
        if (!value){
            return null;
        }

        if (!value){ return null; }

        //if (typeof value != 'number' || value < 1 || value > 12){
        if (isNaN(+value) || value < 1 || value > 12){
            console.log("Value is : " + typeof value);
            console.log("Value : " + value);
            console.log("LOg : " + "invalidMonth");
            return {invalidMonth : true};
        }    
        
        return null;
    }
}