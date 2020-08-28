import { TestBed } from '@angular/core/testing';

import { MeuspedidosService } from './meuspedidos.service';

describe('MeuspedidosService', () => {
  let service: MeuspedidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeuspedidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
