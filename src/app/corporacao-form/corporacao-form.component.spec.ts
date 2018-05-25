import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporacaoFormComponent } from './corporacao-form.component';

describe('CorporacaoFormComponent', () => {
  let component: CorporacaoFormComponent;
  let fixture: ComponentFixture<CorporacaoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporacaoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporacaoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
