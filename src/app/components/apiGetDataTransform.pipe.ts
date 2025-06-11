import { Pipe, PipeTransform } from "@angular/core";
import { CreditCardDto } from "../data/creditCardDto.interface";

@Pipe({name: 'apiGetDataTransform'})
export class ApiGetDataTransform implements PipeTransform
{
    transform(value: any): CreditCardDto {
        var temp = JSON.parse(JSON.stringify(value));            

            let dto : CreditCardDto = new CreditCardDto();
            dto.name = temp.UserName;
            dto.number = temp.CreditCardNumber;
            dto.cvv = temp.CVV;
            dto.zipcode = temp.ZipCode;
            dto.month = temp.ExpiryMonth;
            dto.year = temp.ExpiryYear;

            return dto;
    }

}

