import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GanhadorService } from 'src/app/shared/services/ganhador.service';

@Component({
  selector: 'app-consulta-cpf',
  templateUrl: './consulta-cpf.component.html',
  styleUrls: ['./consulta-cpf.component.scss']
})
export class ConsultaCpfComponent implements OnInit {

  cpf = '';
  notificacaoMensagem = ''
  showNotificacao: boolean
  showMensagem: boolean

  constructor(
    private auth: AuthService,
    private ganhadorService: GanhadorService
  ) { }

  ngOnInit(): void {

  }

  onSubmit(cpf: string) {
    this.showNotificacao = true;

    this.ganhadorService.buscarGanhadorCpf(cpf).subscribe(response => {
      console.log(response)
      if (response.mensagem == 'Cliente elegível para participar da promoção') {
        this.showMensagem = true;
        console.log(this.showMensagem)
      }else{
        this.showMensagem = false;

        console.log(this.showMensagem)
      }
    }
    )
  }

}
