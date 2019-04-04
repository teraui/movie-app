import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {MovieDetailsViewRequest} from "../models/movie-details-view-request.model";
import {CinemaTypes} from "../models/cinema-types.enum";

@Injectable()
export class MovieDetailsResolver implements Resolve<MovieDetailsViewRequest> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDetailsViewRequest> {
    const viewRequest: MovieDetailsViewRequest = new MovieDetailsViewRequest();
    viewRequest.movieId = route.params.movieId;
    viewRequest.cinemaType = CinemaTypes.getType(route.queryParams.cinemaType);
    return of(viewRequest);
  }
}
