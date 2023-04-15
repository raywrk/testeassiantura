import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroGanhadorComponent } from './cadastro-ganhador.component';

describe('CadastroGanhadorComponent', () => {
  let component: CadastroGanhadorComponent;
  let fixture: ComponentFixture<CadastroGanhadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroGanhadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroGanhadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
