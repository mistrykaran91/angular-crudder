import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { <%= classify(name) %> } from './<%=dasherize(name)%>.model';

@Injectable({
    providedIn: 'root'
})
export class <%= classify(name) %>Service {

    private <%= getBaseUrl(name) %> = '<%= getApiPath(name) %>';

    constructor(private http: HttpClient) { }

    <%= getPluralMethod(name) %>: Observable <<%= classify(name) %> [] > {

      return this.http.get<<%= classify(name) %>[]>(this.<%= getBaseUrl(name) %>).pipe(
        tap(<%= getPluralProperty(name) %>=>console.log(`<%= getPluralProperty(name) %> ${ JSON.stringify(<%= getPluralProperty(name) %>)}`)),
        catchError(this.handleError));
  }

  <%= getSingularMethod(name,`id: string`) %>: Observable<<%= classify(name) %>> {

    return this.http.get<<%= classify(name) %>>(`${this.<%= getBaseUrl(name) %>}/${id}`)
      .pipe(
        tap(<%= getSingularProperty(name) %> => console.log(`<%= getSingularProperty(name) %> ${ JSON.stringify(<%= getSingularProperty(name) %>) } `)),
        catchError(this.handleError)
      );
  }

  <%= getCreateMethod(name) %>: Observable<<%= classify(name) %>>  {    
    return this.http.post<<%= classify(name) %>>(this.<%= getBaseUrl(name) %>, <%= camelize(name) %>)
      .pipe(
        tap(response => console.log(`<%= getSingularProperty(name) %> ${ JSON.stringify(response) } `)),
        catchError(this.handleError)
      );
  }

  <%= getUpdateMethod(name) %>: Observable<<%= classify(name) %>> {

    return this.http.put<<%= classify(name) %>>(`${this.<%= getBaseUrl(name) %>}/${<%= camelize(name) %>.<%= idFieldName %>}`, <%= camelize(name) %>)
      .pipe(
        tap(response => console.log(`<%= getSingularProperty(name) %> ${ JSON.stringify(response) } `)),
        catchError(this.handleError)
      );
  }

  <%= getDeleteMethod(name,`id: string`) %> {
        
    return this.http.delete(`${this.<%= getBaseUrl(name) %>}/${id}`, )
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${ err.error.message } `;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${ err.status }, error message is: ${ err.message } `;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  


}