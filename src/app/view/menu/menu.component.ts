import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onLogout(){
    this.auth.logout();
    this.router.navigate(['login'])
  }

}
