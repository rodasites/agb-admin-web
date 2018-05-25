import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporacaoComponent } from './corporacao.component';

describe('CorporacaoComponent', () => {
  let component: CorporacaoComponent;
  let fixture: ComponentFixture<CorporacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
