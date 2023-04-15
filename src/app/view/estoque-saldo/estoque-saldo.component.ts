import { Component, OnInit } from '@angular/core';
import { GanhadorService } from 'src/app/shared/services/ganhador.service';

@Component({
  selector: 'app-estoque-saldo',
  templateUrl: './estoque-saldo.component.html',
  styleUrls: ['./estoque-saldo.component.scss']
})
export class EstoqueSaldoComponent implements OnInit {

  constructor(private ganhadorService: GanhadorService) { }

  painelDados: any[];

  novoRegistroSalvo(){
    this.loadPainel();
  }

  ngOnInit(): void {
    this.loadPainel()
  }

  ngAfterViewInit() {
    this.loadPainel();
  }

  onSubmit(){
    this.loadPainel()
  }

  loadPainel(){
    this.ganhadorService.listaPainelDados().subscribe(result => {
      this.painelDados = result;
    })
  }



}
