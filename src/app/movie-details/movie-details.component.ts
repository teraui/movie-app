import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {map, takeUntil, tap} from "rxjs/operators";
import {MovieDetailsViewRequest} from "../models/movie-details-view-request.model";
import {MovieDetailsService} from "./movie-details.service";
import {MovieDetails} from "../models/movie-details.model";

@Component({
  selector: "app-movie-details",
  template: `
    <div *ngIf="movieDetails$ | async as movieDetails; else loading">
      <h1 class="movie-details__header">{{movieDetails.name}}</h1>
      <div>{{movieDetails.description}}</div>
      <div>{{movieDetails.age}}</div>
      <div>{{movieDetails.duration}}</div>
      <img [src]="movieDetails.imageUrl" [alt]="movieDetails.name">
    </div>
    <ng-template #loading>
      <app-loader></app-loader>
    </ng-template>
  `,
  providers: [
    MovieDetailsService
  ],
  styleUrls: ["./movie-details.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit, OnDestroy {

  movieDetails$: Observable<MovieDetails>;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService,
  ) {
  }

  ngOnInit(): void {
    this.movieDetails$ = this.movieDetailsService.movieDetails$
      .pipe(
        tap(d => console.log(d, "moviedetails"))
      );

    this.route.data
      .pipe(
        map((data: {viewRequest: MovieDetailsViewRequest}) => data.viewRequest),
        takeUntil(this.isDestroyed$)
      )
      .subscribe((viewRequest: MovieDetailsViewRequest) => {
        this.movieDetailsService.loadMovieDetails(viewRequest.movieId, viewRequest.cinemaType);
      });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}
