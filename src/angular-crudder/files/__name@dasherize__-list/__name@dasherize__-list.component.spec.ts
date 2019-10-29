import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { <%=classify(name) %>ListComponent } from './<%= dasherize(name)%>-list.component';

describe('<%=classify(name) %>ListComponent', () => {
  let component: <%=classify(name) %>ListComponent;
  let fixture: ComponentFixture<<%=classify(name) %>ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%=classify(name) %>ListComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%=classify(name) %>ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
