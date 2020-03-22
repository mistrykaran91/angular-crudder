# angular-crudder
A schematic project which generates CRUD operation boiler plate code based on the JSON file(schema).

### Install Schematics
```
npm install angular-crudder
```

Once you install the package `angular-crudder`, that will be available through the Angular CLI.

#### Angular Crudder

```
ng generate angular-crudder:angular-crudder --name=<component-name> --schemaPath=<path-of-your-json-file>
```

Running the `angular-crudder` schematic generates a new Angular component files consisting of:

* Details Component
* Edit Component
* List Component
* Model file
* API service file

Navigation in component's routerLink are written based on the below routes:-
```
  {
    path: '<name>', component: <list-component>
  }
```
```
  {
    path: '<name>/create', component: <edit-component>
  }
```
```
  {
    path: '<name>/:id', component: <details-component>
  }
```
```
  {
    path: '<name>/edit/:id', component: <edit-component>
  }
```

You have to change the api-url in the service file then your CRUD will work.

You can use the `module` property to add the imports in your module file, it uses the regex pattern behind the scene to find the file.

NOTE:- Routing file you have to import it components manually and declare your routes. 

#### angular-crudder Properties

| Property           | Description                                                                                            |
|----------------|--------------------------------------------------------------------------------------------------------|
| `name` | The name of the instance which represent your object. E.g.:- customer, employee   |
| `schemaPath`   | Specifies the path of schema of which form and template is to be generated.   |
| `path`    | Specifies the path to create the files under.             |
| `changeDetection`        | Specifies if a change detection property is to be added in component metadata. Default is false.           |
| `module`         | Specifies the module name in which imports are to be added.|
| `skipModuleImport`         | Specifies if the module import is to skipped or not.|

#### JSON File properties

Each properties of the JSON file should be the FieldName which you want to be displayed in the form. The FieldName values should contain the metadata about that field. Below are the accepted the value metadata:-

| Name           | Description                                                                                            |
|----------------|--------------------------------------------------------------------------------------------------------|
| `isId` | Field is a primary key/id field, which will be used in component's. Possible values: true/false. Default: false   |
| `type`   | Type will be used to generate HTML inputs and if is it group will be used to generate nested forms. Possible values: text, number, radio, select, group   |
| `maxlength`    | If type is text, you use this property to limit the no. of characters.             |
| `required`        | If field is required or not.           |
| `enum`         | If type is radio, you can use this property to display the possible values of the radio |

In case you want to see example of the [Sample](https://github.com/mistrykaran91/angular-crudder/blob/master/samples/schema.json) JSON file.
