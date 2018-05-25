import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenciaFormComponent } from './conferencia-form.component';

describe('ConferenciaFormComponent', () => {
  let component: ConferenciaFormComponent;
  let fixture: ComponentFixture<ConferenciaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenciaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
