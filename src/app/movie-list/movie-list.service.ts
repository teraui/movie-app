import {BackendClientService} from "../services/backend-client.service";
import {Injectable} from "@angular/core";
import {CinemaTypes} from "../models/cinema-types.enum";
import {BehaviorSubject, EMPTY, Observable, Subject} from "rxjs";
import {MovieListItem} from "../models/movie-list-item.model";
import {catchError, map, tap} from "rxjs/operators";

@Injectable()
export class MovieListService {

  private movieListSource: BehaviorSubject<MovieListItem[]> = new BehaviorSubject(null);
  movieList$: Observable<MovieListItem[]> = this.movieListSource.asObservable();

  constructor(
    private backendClientService: BackendClientService,
  ) {
  }

  loadMovieList(cinemaType: CinemaTypes): void {
    const prevValue = this.movieListSource.getValue();

    if (prevValue) {
      this.movieListSource.next(null);
    }

    this.backendClientService.loadMovieList(cinemaType)
      .pipe(
        map((movieListItems: MovieListItem[]) => {
          return movieListItems.map((item: MovieListItem) => {
            item.cinemaType = cinemaType;
            return item;
          });
        }),
        tap((movieListItems: MovieListItem[]) => {
          this.movieListSource.next(movieListItems);
        }),
        catchError(errorInfo => {
          console.log(errorInfo);
          return EMPTY;
        })
      ).subscribe();
  }
}
