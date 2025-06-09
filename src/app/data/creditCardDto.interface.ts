export interface CreditCardDto{
    name : string,
    number : string,
    month : string,
    year : string,
    cvv : string,
    zipcode : string
}

export class CreditCardDto{
    constructor()
    {
        return {
            name : '',
            number : '',
            month : '',
            year : '',
            cvv : '',
            zipcode : '',
        }
    }

    /*constructor(dto ? : CreditCardDto)
    {
        return {
            name : dto ? dto.name : '',
            number : dto ? dto.number : '',
            month : dto ? dto.month : '',
            year : dto ? dto.year : '',
            cvv : dto ? dto.cvv : '',
            zipcode : dto ? dto.zipcode : '',
        }
    }*/
}