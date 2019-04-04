import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {MovieListComponent} from "./movie-list/movie-list.component";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {BackendClientService} from "./services/backend-client.service";
import {HttpClientModule} from "@angular/common/http";
import {MovieListItemComponent} from "./movie-list-item/movie-list-item.component";
import {LoaderComponent} from "./loader/loader.component";
import {DropdownModule} from "primeng/components/dropdown/dropdown";
import {MovieListFilterComponent} from "./movie-list-filter/movie-list-filter.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DropdownModule
  ],
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieListItemComponent,
    MovieListFilterComponent,
    LoaderComponent,
    PageNotFoundComponent,
  ],
  providers: [
    BackendClientService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
