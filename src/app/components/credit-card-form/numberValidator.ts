import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function NumberValidator() : ValidatorFn{
    return(control:AbstractControl): ValidationErrors | null => {

        const value = control.value;
        if (!value){
            return null;
        }

        if (isNaN(+value))
        {
            console.log("Value : " + value);
            console.log("LOg : " + "NotaNumber");
            return {NotaNumber : true};
        }

        return null;
    }
}