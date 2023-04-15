import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>{
    if(req.url.endsWith('/login')){
      return next.handle(req)
    }
    if(req.url.endsWith('/upload?key=6de35111a331b5386b41aa71609e2802')){
      return next.handle(req)
    }
    let token = this.auth.getToken()
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(authReq);
  }
}
