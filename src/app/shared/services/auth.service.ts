import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface localStorageData{
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private http: HttpClient,
  private router: Router
  ) { }

  login(email: any, senha: any): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(environment.urlBase + '/login', { email, senha }, httpOptions);
  }

  logout(){
    localStorage.removeItem('@zecompensa')
    this.router.navigate(['/login'])
  }

  TokenIsValid(){
    const decode = this.decodeToken()

    if(!decode) return false
    return (Date.now() >= decode.exp * 1000)? false : true
  }

  decodeToken(): any{
    if(!localStorage.getItem('@zecompensa')) return false
    const data: localStorageData = JSON.parse(localStorage.getItem('@zecompensa')!)
    if(!data) return false
    return jwtDecode(data.token)
  }

  getToken(): any{
    return JSON.parse(localStorage.getItem('@zecompensa')!).token
  }

}
