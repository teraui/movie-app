import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {CinemaTypes} from "../models/cinema-types.enum";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class MovieListResolver implements Resolve<CinemaTypes> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CinemaTypes> {
    const cinemaTypeQuery: string = route.queryParams.cinemaType;
    return cinemaTypeQuery ? of(CinemaTypes.getType(cinemaTypeQuery)) : of(CinemaTypes.defaultType());
  }
}
