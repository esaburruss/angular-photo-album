# AngularPhotoAlbum

Assignment:

Create an angular application for managing photo albums. The data model for these should follow the data formats returned by the /users, /photos, and /albums APIs located at http://jsonplaceholder.typicode.com. The application can be seeded with initial data using those same APIs.

Data should be loaded from the jsonplaceholder website.
App must display a list of users.
Clicking on a user should display the list of albums for that user.
The list of albums should show a thumbnail of the album, which is just the first photo’s thumbnail.
Clicking on an album should show the entire list of photos in the album, using each photo’s thumbnail.
Clicking on a photo should show the full size photo with the photo’s title as a caption.
The app should allow for the standard CRUD operations on the albums, photos, and users
The app should implement paging for the list of albums or photos (synchronous or asynchronous)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
