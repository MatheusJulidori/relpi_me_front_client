import { TestBed } from '@angular/core/testing';

import { RegistrarpedidosService } from './registrarpedidos.service';

describe('RegistrarpedidosService', () => {
  let service: RegistrarpedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarpedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
