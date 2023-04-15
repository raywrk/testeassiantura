import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaCpfComponent } from './consulta-cpf.component';

describe('ConsultaCpfComponent', () => {
  let component: ConsultaCpfComponent;
  let fixture: ComponentFixture<ConsultaCpfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaCpfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
