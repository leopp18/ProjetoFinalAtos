import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  readonly VaultAPIUrl = "https://localhost:7036/api";

  constructor(private http:HttpClient) { }

  // authUser(data:any):Observable<any>{
  //   return this.http.post(this.VaultAPIUrl + '/Account/authenticate', data);//aqui
  // }

  getAccountList():Observable<any[]>{
    return this.http.get<any>(this.VaultAPIUrl + '/Account/accounts');
  }

  addAccount(data:any){
    return this.http.post(this.VaultAPIUrl + '/Account/accounts', data);
  }

  updateAccount(id:number|string, data:any){
    return this.http.put(this.VaultAPIUrl + `/Account/accounts/${id}`, data);
  }

  deleteAccount(id:number|string){
    return this.http.delete(this.VaultAPIUrl + `/Account/accounts/${id}`);
  }
}
