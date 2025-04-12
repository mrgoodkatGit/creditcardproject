import { CreditcardType } from "./creditCardType.interface"

export class CreditcardTypeData{

    constructor(){        
    }

    cctypes : CreditcardType[] = [];

    public getData() : CreditcardType[]{
        
        var amx : CreditcardType = {
            id : 'Amx',
            name : 'American Express',
            bin : 3
        } ;
        this.cctypes.push(amx);

        var visa : CreditcardType = {
            id : 'Visa',
            name : 'Visa',
            bin : 4
        } ;
        this.cctypes.push(visa);

        var mc : CreditcardType = {
            id : 'MC',
            name : 'Master Card',
            bin : 5
        } ;
        this.cctypes.push(mc);

        var dsc : CreditcardType = {
            id : 'Dsc',
            name : 'Discover',
            bin : 6
        } ;
        this.cctypes.push(dsc);

        return this.cctypes;
    }
}