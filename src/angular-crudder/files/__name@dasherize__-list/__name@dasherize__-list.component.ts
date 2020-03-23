import { Component, OnInit, <% if(changeDetection === 'true') { %>ChangeDetectionStrategy  <% } %> } from '@angular/core';
import { Router } from '@angular/router';

import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';
import { <%= classify(name) %> } from '../<%= dasherize(name) %>.model';

@Component({
  selector: 'app-<%= dasherize(name) %>-list',
  templateUrl: './<%= dasherize(name) %>-list.component.html',
  styleUrls: ['./<%= dasherize(name) %>-list.component.scss']
   <% if(changeDetection === 'true') { %> ,changeDetection: ChangeDetectionStrategy.OnPush <% } %>
})
export class <%= classify(name) %>ListComponent implements OnInit {

  public <%= getPluralPropertyName(name,pluralName) %>: <%= classify(name) %>[];
  public pageTitle = '<%= classify(name) %> List';

  constructor(
    private <%= camelize(name) %>Service: <%= classify(name) %>Service,
    private router: Router) { }

  ngOnInit() {
    this.get<%= classify(name) %>s();
  }

  get<%= classify(name) %>s(): void {
    this.<%= camelize(name) %>Service.get<%= classify(name) %>s()
      .subscribe(<%= getPluralPropertyName(name,pluralName) %> => this.<%= getPluralPropertyName(name,pluralName) %> = <%= getPluralPropertyName(name,pluralName) %>);
  }

  onAddClick() {
    // Navigate to the page you want.
    this.router.navigate(['<%= camelize(name) %>/create']);
  }

  onDeleteClick(<%= camelize(name) %>: <%= classify(name) %>) {
    const <%= camelize(name) %>Id = <%= camelize(name) %>.<%= idFieldName %>;
     // show confirmation message in real world app
    if (confirm('Are you sure you want to delete <%= camelize(name) %> ?')) {
      this.<%= camelize(name) %>Service.delete<%= classify(name) %>(<%= camelize(name) %>Id).subscribe((response) => {
        this.get<%= classify(name) %>s();
        //  show info message in real world app 
        console.log(response);
      })
    }
  }
}
