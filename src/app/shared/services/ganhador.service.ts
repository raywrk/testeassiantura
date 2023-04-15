import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Ganhador } from '../models/ganhador';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GanhadorService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
    ) {}

    buscarGanhadorCpf(cpf: string){
      return this.http.get<any>(`${environment.urlBase}/api/cadastro/${cpf}`)
    }

    private criar(ganhador: Partial<Ganhador>){
      return this.http.post<Ganhador>(`${environment.urlBase}/api/cadastro`, ganhador).pipe(first());
    }

    salvar(ganhador: Partial<Ganhador>){
      return this.criar(ganhador);
    }

}
