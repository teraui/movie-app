import {RouterModule, Routes} from "@angular/router";
import {MovieListComponent} from "./movie-list/movie-list.component";
import {NgModule} from "@angular/core";
import {MovieDetailsComponent} from "./movie-details/movie-details.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MovieDetailsResolver} from "./movie-details/movie-details.resolver";
import {MovieListResolver} from "./movie-list/movie-list.resolver";

const appRoutes: Routes = [
  {
    path: "",
    component: MovieListComponent,
    resolve: {cinemaType: MovieListResolver},
    runGuardsAndResolvers: "paramsOrQueryParamsChange",
  },
  {
    path: "movie/:movieId",
    component: MovieDetailsComponent,
    resolve: {viewRequest: MovieDetailsResolver},
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    MovieListResolver,
    MovieDetailsResolver,
  ]
})
export class AppRoutingModule {
}
