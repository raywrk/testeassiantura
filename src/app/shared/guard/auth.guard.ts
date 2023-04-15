import { AuthService } from './../services/auth.service';

import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtAuth: AuthService
    ) {}
    canActivate(): boolean {
      if (!this.jwtAuth.TokenIsValid()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }

}
