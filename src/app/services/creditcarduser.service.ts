import { Injectable } from '@angular/core';
import { HttpClient, withFetch, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { CreditCardDto } from '../data/creditCardDto.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditcarduserService {

  private url = 'http://localhost:5194/api/Home/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };

  constructor(private http: HttpClient) 
  { }

  getCreditCardUser(userName : string) : Observable<CreditCardDto>{
    console.log("get method");

    let headers = new HttpHeaders({'username': userName});    
    //headers.set('accept', 'application/json');
    //headers.set('username:', userName);
    
    let params = new HttpParams();
    params.set('username:', userName);

    //return this.http.get<any>(this.url + "?username=" + userName);
    //return this.http.get<any>(this.url + "get", {headers, params});
    return this.http.get<CreditCardDto>(this.url + "get", {headers: headers});
    //.pipe(            catchError(this.handleError<CreditCardDto>('getCreditCardUser', new CreditCardDto()))        );    
  }

  saveCreditCardUser(user : CreditCardDto){
    let data = {
      'id': 0,
      'userName': user.name,
      'zipCode': user.zipcode,
      'creditCardNumber': user.number,
      'cvv': user.cvv,
      'expiryMonth': user.month,
      'expiryYear': user.year
    };

    console.log("saveCreditCardUser method");
    return this.http.post(this.url, data).pipe(
      tap(_ => console.log(`saved user info username = ${user.name}`))      
    );
  }

  private handleError<T>(operation = 'operation', result? : T )
  {
    return (error : any) : Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
