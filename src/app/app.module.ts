import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HotToastModule } from '@ngneat/hot-toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './view/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConsultaCpfComponent } from './view/consulta-cpf/consulta-cpf.component';
import { MenuComponent } from './view/menu/menu.component';
import { SharedMaterialModule } from './shared/shared-material.module';
import { NgxMaskModule } from 'ngx-mask';
import { TokenService } from './shared/services/token.service';
import { CadastroGanhadorComponent } from './view/cadastro-ganhador/cadastro-ganhador.component';
import { AssinaturaComponent } from './assinatura.component';
import { EstoqueSaldoComponent } from './view/estoque-saldo/estoque-saldo.component';
const components = [
  AppComponent,
  LoginComponent,
  ConsultaCpfComponent,
  MenuComponent,
  CadastroGanhadorComponent,
  AssinaturaComponent,
  EstoqueSaldoComponent,
]

@NgModule({
  declarations: [
    components,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    SharedMaterialModule,
    HotToastModule.forRoot(),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: [components]
})
export class AppModule { }
