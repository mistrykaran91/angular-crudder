import { Component, OnInit, <% if(changeDetection === 'true') { %>ChangeDetectionStrategy  <% } %> } from '@angular/core';
import { Store } from '@ngrx/store';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as Selectors from '@app/selectors';
import * as Reducers from '@app/reducers';
import * as Actions from '@app/actions';

import { <%= classify(name) %> } from '@interfaces/<%= dasherize(name) %>.interface';

@Component({
  selector: 'app-<%= dasherize(name) %>',
  templateUrl: './<%= dasherize(name) %>.page.html',
  styleUrls: ['./<%= dasherize(name) %>.page.scss']
   <% if(changeDetection === 'true') { %> ,changeDetection: ChangeDetectionStrategy.OnPush <% } %>
})
export class <%= classify(name) %>Page implements OnInit {

  <%= camelize(name) %>s$: Observable<<%= classify(name) %>> = this.store.select(Selectors.get<%= classify(name) %>s);
  is<%= camelize(name) %>Empty$: Observable<boolean> = this.store.select(
    Selectors.getIs<%= camelize(name) %>Empty
  );  

  constructor(private store: Store<Reducers.<%= classify(name) %>State>,
    private router: Router) { }

  ngOnInit() {    
    this.store.dispatch(Actions.load<%= classify(name) %>());
  }

  on<%= classify(name) %>Selected(<%= camelize(name) %>: <%= classify(name) %>) {
    this.store.dispatch(Actions.setCurrent<%= classify(name) %>({ <%= camelize(name) %> }));
    this.router.navigate([`/<%= camelize(name) %>/${<%= camelize(name) %>.id}`]);
  }

  onAdd<%= classify(name) %>() {
    this.store.dispatch(Actions.setCurrent<%= classify(name) %>({ <%= camelize(name) %>: null }));
    this.router.navigate(['/', '<%= camelize(name) %>', 0,'edit']);
  }
  
  onEdit<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.store.dispatch(Actions.setCurrent<%= classify(name) %>({ <%= camelize(name) %> }));
    this.router.navigate(['/', '<%= camelize(name) %>', <%= camelize(name) %>.id, 'edit']);
  }

  onDelete<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.store.dispatch(Actions.showDeleteConfirmation({ <%= camelize(name) %> }));
  }
}
