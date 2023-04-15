import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: HotToastService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    })
  }

  onSubmit() {

    const { email, senha } = this.loginForm.value

    this.auth.login(email, senha).subscribe({
      next: (response) =>{
        const token = response.token; // extrai o token da resposta
        const data = { token };
        localStorage.setItem('@zecompensa', JSON.stringify(data));
        this.toast.success("Login realizado com sucesso")
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toast.error("Usuário ou senha inválido")
      }
    })
  }

}
