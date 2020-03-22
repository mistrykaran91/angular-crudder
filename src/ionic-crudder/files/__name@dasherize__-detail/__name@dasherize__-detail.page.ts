import { Component, OnInit, <% if(changeDetection === 'true') { %>ChangeDetectionStrategy  <% } %> } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as Selectors from '@app/selectors';
import * as Reducers from '@app/reducers';
import * as Actions from '@app/actions';

import { <%= classify(name) %> } from '@interfaces/<%= dasherize(name) %>.interface';

@Component({
  selector: 'app-<%= dasherize(name) %>-detail',
  templateUrl: './<%= dasherize(name) %>-detail.page.html',
  styleUrls: ['./<%= dasherize(name) %>-detail.page.scss']
   <% if(changeDetection === 'true') { %> ,changeDetection: ChangeDetectionStrategy.OnPush <% } %>
})
export class <%= classify(name) %>DetailPage implements OnInit {

  <%= camelize(name) %>$: Observable<<%= classify(name) %>> = this.store.select(Selectors.getCurrent<%= classify(name) %>);

  constructor(private store: Store<Reducers.<%= classify(name) %>State>,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    const <%= camelize(name) %>Id = +this.activatedRoute.snapshot.paramMap.get('<%= camelize(name) %>');
    this.store.dispatch(Actions.load<%= classify(name) %>ById({ <%= camelize(name) %>Id }));
    
  }

  onDelete<%= classify(name) %>(<%= camelize(name) %>: <%= classify(name) %>) {
    this.store.dispatch(Actions.showDeleteConfirmation({ <%= camelize(name) %> }));
  }
}
