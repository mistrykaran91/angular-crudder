import { Component, OnInit, <% if(changeDetection === 'true') { %>ChangeDetectionStrategy  <% } %> } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { <%= classify(name) %> } from '../<%= dasherize(name) %>.model';
import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';

@Component({
  selector: 'app-<%= dasherize(name) %>-details',
  templateUrl: './<%= dasherize(name) %>-details.component.html',
  styleUrls: ['./<%= dasherize(name) %>-details.component.scss']
   <% if(changeDetection === 'true') { %> ,changeDetection: ChangeDetectionStrategy.OnPush <% } %>
})
export class <%= classify(name) %>DetailsComponent implements OnInit {

  pageTitle = "<%= classify(name) %> Details";
  <%= camelize(name) %>: <%= classify(name) %>;

  constructor(private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe((params) => {
      this.get<%= classify(name) %>(params.id);
    });
  }

  get<%= classify(name) %>(<%= camelize(name) %>Id: string): void {
    this.<%= camelize(name) %>Service.get<%= classify(name) %>(<%= camelize(name) %>Id)
      .subscribe(<%= camelize(name) %> => this.<%= camelize(name) %> = <%= camelize(name) %>);
  }

  onCancelClick(): void {
    // Navigate to the page you want.
    // this.router.navigate(['']);
    this.location.back();
  }

  onEditClick(): void {
    const <%= camelize(name) %>Id = this.<%= camelize(name) %>.<%= idFieldName %>;
    this.router.navigate([`<%= camelize(name) %>/edit/${<%= camelize(name) %>Id}`]);
  }

  onDeleteClick(): void {
    const <%= camelize(name) %>Id = this.<%= camelize(name) %>.<%= idFieldName %>;
  // show confirmation message in real world app
    if (confirm('Are you sure you want to delete <%= camelize(name) %> ?')) {
      this.<%= camelize(name) %>Service.delete<%= classify(name) %>(<%= camelize(name) %>Id)
        .subscribe((response) => {          
          console.log(response);
          // Navigate to the page you want.
          // this.router.navigate(['']);
        });
    }
  }
}
