import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrantesImpressaoComponent } from './integrantes-impressao.component';

describe('IntegrantesImpressaoComponent', () => {
  let component: IntegrantesImpressaoComponent;
  let fixture: ComponentFixture<IntegrantesImpressaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrantesImpressaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrantesImpressaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
