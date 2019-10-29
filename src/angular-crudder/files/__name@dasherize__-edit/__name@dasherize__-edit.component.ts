import { Component, OnInit, <% if(changeDetection === 'true') { %>ChangeDetectionStrategy  <% } %> } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { <%= classify(name) %>Service } from '../<%= dasherize(name) %>.service';
import { <%= classify(name) %> } from '../<%= dasherize(name) %>.model';

@Component({
  selector: 'app-<%= dasherize(name) %>-edit',
  templateUrl: './<%= dasherize(name) %>-edit.component.html',
  styleUrls: ['./<%= dasherize(name) %>-edit.component.scss']
   <% if(changeDetection === 'true') { %> ,changeDetection: ChangeDetectionStrategy.OnPush <% } %>
})
export class <%= classify(name) %>EditComponent implements OnInit {

  mainForm: FormGroup;
  pageTitle = "<%= classify(name) %>";
  <%= camelize(name) %>: <%= classify(name) %>;
  isEditPage: boolean;

  constructor(private readonly formBuilder: FormBuilder,
    private readonly <%= camelize(name) %>Service: <%= classify(name) %>Service,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location) { }

  ngOnInit() {
    
    this.mainForm = this.createMainForm();
    this.activatedRoute.params.subscribe((params) => {
      if (this.isEditAction(params)) {
        this.isEditPage = true;
        this.pageTitle = `${this.pageTitle} Edit`;
        this.get<%= classify(name) %>(params.id);
      } else {
        this.isEditPage = false;
        this.pageTitle = `${this.pageTitle} Create`;
      }
    });
  }

  get<%= classify(name) %>(<%= camelize(name) %>Id: string): void {
    this.<%= camelize(name) %>Service.get<%= classify(name) %>(<%= camelize(name) %>Id)
      .subscribe(<%= camelize(name) %> => {
        this.<%= camelize(name) %> = <%= camelize(name) %>;
        if (this.<%= camelize(name) %>) {
          this.mainForm.patchValue(this.<%= camelize(name) %>);
        }
      });
  }

  onCancelClick(): void {
    // Navigate to the page you want.
    // this.router.navigate(['']);
    this.location.back();
  }

  onSaveClick(): void {

    if (!this.isEditPage) {
      const <%= camelize(name) %> = Object.assign({}, this.mainForm.value);
      this.<%= camelize(name) %>Service.create<%= classify(name) %>(<%= camelize(name) %>)
        .subscribe((<%= camelize(name) %>) => {
          // show some confirmation message in real world app
          console.log(<%= camelize(name) %>);
          // Navigate to the page you want.
          // this.router.navigate(['']);
          this.location.back();
        });
    } else {
      const <%= camelize(name) %> = Object.assign({}, this.<%= camelize(name) %>, this.mainForm.value);
      this.<%= camelize(name) %>Service.update<%= classify(name) %>(<%= camelize(name) %>)
        .subscribe((<%= camelize(name) %>) => {
          // show some confirmation message in real world app
          console.log(<%= camelize(name) %>);
          // Navigate to the page you want.
          // this.router.navigate(['']);
          this.location.back();
        });
    }
  }

  isEditAction = (params) => !!(params && params.id && params.id !== '0'&& params.id !== '');

  <%= generateForm(schemaPath) %>
}
