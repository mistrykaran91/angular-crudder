import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { <%=classify(name) %>EditComponent } from './<%= dasherize(name)%>-edit.component';import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('<%=classify(name) %>EditComponent', () => {
  let component: <%=classify(name) %>EditComponent;
  let fixture: ComponentFixture<<%=classify(name) %>EditComponent>;

  const mockFormBuilder = jasmine.createSpyObj('mockFormBuilder', ['group', 'array', 'control']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%=classify(name) %>EditComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: FormBuilder, useValue: mockFormBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%=classify(name) %>EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
