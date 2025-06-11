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

  getCreditCardUser(userName : string) : Observable<any[]>{    

    let headers = new HttpHeaders({'username': userName});        
    let res = this.http.get<any[]>(this.url + "get", {headers: headers});    
    
    return res;
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
