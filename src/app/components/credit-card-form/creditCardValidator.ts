import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

export function CreditCardValidator() : ValidatorFn{
    return(control:AbstractControl): ValidationErrors | null => {

        const value = control.value;
        if (!value){
            return null;
        }

        //the validation of credit card number or the format and all in the input box is a project on its own. So for this project we would just do the basic
        //that our users only enter number and - and if anything else than the validation works. 
        let creditCardNumber = value.replace('-', '');
        let regex = /^\d+$/;
        const isNumber = regex.test(creditCardNumber);

        console.log("Log Credit Card number : " + creditCardNumber);
        console.log("Log Credit Card isNumber : " + creditCardNumber);

        return !isNumber ? {creditCardNumber : true} : null;
    }
}