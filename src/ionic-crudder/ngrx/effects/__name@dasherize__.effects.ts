import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from '@services/message.service';
import * as <%= classify(name) %>Actions from '@app/actions/<%= dasherize(name) %>.actions';
import * as Selectors from '@app/selectors';
import * as Reducers from '@app/reducers';
import { concatMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { <%= classify(name) %> } from '@interfaces/<%= dasherize(name) %>.interface';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Effects {
  private <%= camelize(name) %>Url = '<%= getAPIUrl(name,apiUrl) %>';

  load<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.load<%= classify(name) %>),
      concatMap(_ => {
        return this.http
          .get<<%= classify(name) %>[]>(`${this.<%= camelize(name) %>Url}`)
          .pipe(
            map(<%= getPluralPropertyName(name,pluralName) %> => <%= classify(name) %>Actions.load<%= classify(name) %>Success({ <%= getPluralPropertyName(name,pluralName) %> }))
          );
      })
    )
  );

  load<%= classify(name) %>ById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.load<%= classify(name) %>ById),
      withLatestFrom(this.store.select(Selectors.getCurrent<%= classify(name) %>)),
      concatMap(([action, current<%= classify(name) %>]) => {
        if (current<%= classify(name) %>) {
          return [];
        }

        const { <%= camelize(name) %>Id } = action;

        return this.http
          .get<<%= classify(name) %>>(`${this.<%= camelize(name) %>Url}/${<%= camelize(name) %>Id}`)
          .pipe(
            map(<%= camelize(name) %> => <%= classify(name) %>Actions.load<%= classify(name) %>ByIdSuccess({ <%= camelize(name) %> }))
          );
      })
    )
  );

  create<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.create<%= classify(name) %>),
      concatMap(action => {
        const <%= camelize(name) %> = { ...action.<%= camelize(name) %> };
        delete <%= camelize(name) %>.id;

        return this.http.post<<%= classify(name) %>>(`${this.<%= camelize(name) %>Url}`, <%= camelize(name) %>).pipe(
          map(<%= camelize(name) %> => <%= classify(name) %>Actions.create<%= classify(name) %>Success({ <%= camelize(name) %> })),
          tap(() => {
            this.messageService.successToast(`<%= classify(name) %> Created Successfully.`);
            this.router.navigate(['/<%= camelize(name) %>']);
          })
        );
      })
    )
  );

  update<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.update<%= classify(name) %>),
      concatMap(action => {
        const { <%= camelize(name) %> } = action;
        return this.http
          .put<<%= classify(name) %>>(`${this.<%= camelize(name) %>Url}/${<%= camelize(name) %>.id}`, <%= camelize(name) %>)
          .pipe(
            map(_ => <%= classify(name) %>Actions.update<%= classify(name) %>Success({ <%= camelize(name) %> })),
            tap(() => {
              this.messageService.successToast(`<%= classify(name) %> Updated Successfully.`);
              this.router.navigate(['/<%= camelize(name) %>']);
            })
          );
      })
    )
  );

  showDeleteConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.show<%= classify(name) %>DeleteConfirmation),
      concatMap(async action => {
        const { <%= camelize(name) %> } = action;
        const confirm = await this.messageService.confirmation(
          `Delete ${<%= camelize(name) %>.name} <%= classify(name) %> ?`,
          null
        );
        confirm.present();
        const { role } = await confirm.onDidDismiss();
        if (role === 'yes') {
          return <%= classify(name) %>Actions.delete<%= classify(name) %>({ <%= camelize(name) %>Id: <%= camelize(name) %>.id });
        } else {
          return <%= classify(name) %>Actions.delete<%= classify(name) %>Revert();
        }
      })
    )
  );

  delete<%= classify(name) %>$ = createEffect(() =>
    this.actions$.pipe(
      ofType(<%= classify(name) %>Actions.delete<%= classify(name) %>),
      concatMap(action => {
        const { <%= camelize(name) %>Id } = action;

        return this.http.delete(`${this.<%= camelize(name) %>Url}/${<%= camelize(name) %>Id}`).pipe(
          map(_ => <%= classify(name) %>Actions.delete<%= classify(name) %>Success({ <%= camelize(name) %>Id })),
          tap(() => {
            this.messageService.successToast(`<%= classify(name) %> Deleted Successfully.`);
            this.router.navigate(['/<%= camelize(name) %>']);
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
    private store: Store<Reducers.<%= classify(name) %>State>
  ) {}
}
