import { Component, OnInit,  <% if(changeDetection === 'true') { %>ChangeDetectionStrategy  <% } %> } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import * as Actions from '@app/actions';
import * as Reducers from '@app/reducers';
import * as Selectors from '@app/selectors';
import { <%= classify(name) %> } from '@interfaces/<%= dasherize(name) %>.interface';

@Component({
  selector: 'app-<%= dasherize(name) %>-edit',
  templateUrl: './<%= dasherize(name) %>-edit.page.html',
  styleUrls: ['./<%= dasherize(name) %>-edit.page.scss']
   <% if(changeDetection === 'true') { %> ,changeDetection: ChangeDetectionStrategy.OnPush <% } %>
})
export class <%= classify(name) %>EditPage implements OnInit {

  <%= camelize(name) %>Form: FormGroup;
  <%= camelize(name) %>: <%= classify(name) %>;

  constructor(private store: Store<Reducers.<%= classify(name) %>State>,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    
    const <%= camelize(name) %>Id = +this.activatedRoute.snapshot.paramMap.get('<%= camelize(name) %>Id');
    this.store.dispatch(Actions.load<%= classify(name) %>ById({ <%= camelize(name) %>Id }));

    this.store
      .select(Selectors.getCurrent<%= classify(name) %>)
      .subscribe(<%= camelize(name) %> => {
        this.<%= camelize(name) %> = <%= camelize(name) %>;
        if (this.<%= camelize(name) %>) {
          this.<%= camelize(name) %>Form = this.createMainForm();
          this.<%= camelize(name) %>Form.patchValue(this.<%= camelize(name) %>);
        }    
      });
  }

  <%= generateForm(schemaPath,name) %>

  save(): void {
    if (this.<%= camelize(name) %>Form.invalid) {
      return;
    }

    const <%= camelize(name) %>: <%= classify(name) %> = { ...this.<%= camelize(name) %>, ...this.<%= camelize(name) %>Form.value };

    if (<%= camelize(name) %>.id === 0) {
      this.store.dispatch(Actions.create<%= classify(name) %>({ <%= camelize(name) %> }));
    } else {
      this.store.dispatch(Actions.update<%= classify(name) %>({ <%= camelize(name) %> }));
    }
  }
}
