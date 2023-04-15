import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from './shared-material.module';
import { HttpClientModule } from '@angular/common/http';

const components = [
  NavbarComponent,
  LayoutComponent,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    HttpClientModule
  ],
  declarations: [components],
  exports: [components]
})
export class SharedModule { }
