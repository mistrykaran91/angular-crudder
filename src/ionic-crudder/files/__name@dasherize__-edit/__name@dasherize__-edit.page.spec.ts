import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { <%=classify(name) %>EditPage } from './<%=classify(name) %>-edit.page';

describe('<%=classify(name) %>EditPage', () => {
  let component: <%=classify(name) %>EditPage;
  let fixture: ComponentFixture<<%=classify(name) %>EditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%=classify(name) %>EditPage ],
      imports:[IonicModule.forRoot()]      
    })
    .compileComponents();

    fixture = TestBed.createComponent(<%=classify(name) %>EditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
