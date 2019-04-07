import {Injectable} from "@angular/core";
import {BackendClientService} from "../services/backend-client.service";
import {CinemaTypes} from "../models/cinema-types.enum";
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
import {MovieDetails} from "../models/movie-details.model";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class MovieDetailsService {

  private movieDetailsSource: BehaviorSubject<MovieDetails> = new BehaviorSubject(null);
  movieDetails$: Observable<MovieDetails> = this.movieDetailsSource.asObservable();

  constructor(
    private backendClientService: BackendClientService,
  ) {
  }

  loadMovieDetails(movieId: string, cinemaType: CinemaTypes): void {
    this.backendClientService.loadMovieDetails(movieId, cinemaType)
      .pipe(
        tap((movieDetails: MovieDetails) => {
          this.movieDetailsSource.next(movieDetails);
        }),
        catchError(errorInfo => {
          console.log(errorInfo);
          return EMPTY;
        })
      ).subscribe();
  }
}
