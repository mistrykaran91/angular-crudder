import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { <%=classify(name) %>DetailPage } from './<%=classify(name) %>-detail.page';

describe('<%=classify(name) %>DetailPage', () => {
  let component: <%=classify(name) %>DetailPage;
  let fixture: ComponentFixture<<%=classify(name) %>DetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%=classify(name) %>DetailPage ],
      imports:[IonicModule.forRoot()]      
    })
    .compileComponents();

    fixture = TestBed.createComponent(<%=classify(name) %>DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
