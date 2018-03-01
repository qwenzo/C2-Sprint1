import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient , HttpHeaders  , HttpErrorResponse } from '@angular/common/http';

import { APIData , LoginData, Product } from './models/api.data.structure'


@Injectable()
export class APIService {
  private apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) {}

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }


  getProducts(): Observable<APIData> {
    return this.http.get<APIData>(this.apiUrl + 'product/getProducts').catch(this.errorHandler);
  }

  createUser(loginData: LoginData): Observable<APIData> {
    return this.http.post<APIData>(this.apiUrl + 'user/create', loginData).catch(this.errorHandler);
  };

  createProduct(Product :  Product) : Observable<APIData> {
    return this.http.post<APIData>(this.apiUrl + 'product/createProduct', Product).catch(this.errorHandler);
  };

  updateProduct(Product :  Product) : Observable<APIData> {
    return this.http.patch<APIData>(this.apiUrl + 'product/updateProduct/'+ Product._id,Product).catch(this.errorHandler);
  };

  deleteProduct(productid : Product ) : Observable<APIData> {
    return this.http.delete<APIData>(this.apiUrl + 'product/deleteProduct/'+ productid._id).catch(this.errorHandler);
  };

  login(loginData: LoginData): Observable<APIData> {
    return this.http.post<APIData>(this.apiUrl + 'auth/login', loginData).catch(this.errorHandler);
  }
}