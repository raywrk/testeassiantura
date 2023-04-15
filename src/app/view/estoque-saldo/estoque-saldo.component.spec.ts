import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueSaldoComponent } from './estoque-saldo.component';

describe('EstoqueSaldoComponent', () => {
  let component: EstoqueSaldoComponent;
  let fixture: ComponentFixture<EstoqueSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstoqueSaldoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
