import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoVendedorComponent } from './pedido-vendedor.component';

describe('PedidoVendedorComponent', () => {
  let component: PedidoVendedorComponent;
  let fixture: ComponentFixture<PedidoVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
