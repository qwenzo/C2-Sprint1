import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { HttpClient , HttpHeaders  , HttpErrorResponse } from '@angular/common/http';

import { APIData , LoginData } from './models/api.data.structure'
import { Product } from './models/api.data.structure'


@Injectable()
export class APIService {
  constructor(private http: HttpClient) {}

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }

  getProducts(): Observable<APIData> {
    return this.http.get<APIData>('http://localhost:3000/api/' + 'product/getProducts').catch(this.errorHandler);
  }
  createProduct(Product:Product): Observable<APIData> {
    return this.http.post<APIData>('http://localhost:3000/api/'+ 'product/createProduct',Product).catch(this.errorHandler);
  }
  updateProduct(Product: Product): Observable<APIData> {
    return this.http.patch<APIData>('http://localhost:3000/api/'+ 'product/updateProduct/'+Product._id,Product).catch(this.errorHandler);
  }
  deleteProduct(Product: Product): Observable<APIData> {
    return this.http.delete<APIData>('http://localhost:3000/api/'+ 'product/deleteProduct/'+Product._id).catch(this.errorHandler);
  }
  login(loginData: LoginData): Observable<APIData> {
    return this.http.post<APIData>('http://localhost:3000/api/auth/login', loginData).catch(this.errorHandler);
  }
}
