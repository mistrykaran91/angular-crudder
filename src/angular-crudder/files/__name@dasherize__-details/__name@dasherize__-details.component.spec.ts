import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { <%=classify(name) %>DetailsComponent } from './<%= dasherize(name)%>-details.component';

describe('<%=classify(name) %>DetailsComponent', () => {
  let component: <%=classify(name) %>DetailsComponent;
  let fixture: ComponentFixture<<%=classify(name) %>DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%=classify(name) %>DetailsComponent ],
      imports:[HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(<%=classify(name) %>DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
