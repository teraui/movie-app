import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {MovieListService} from "./movie-list.service";
import {Observable, Subject} from "rxjs";
import {MovieListItem} from "../models/movie-list-item.model";
import {ActivatedRoute} from "@angular/router";
import {map, takeUntil, tap} from "rxjs/operators";
import {CinemaTypes} from "../models/cinema-types.enum";

@Component({
  selector: "app-movie-list",
  template: `
    <div class="movie-list">
      <h1 class="movie-list__header">Movie List</h1>
      <app-movie-list-filter [currentCinemaType]="currentCinemaType"></app-movie-list-filter>
      <div *ngIf="movieList$ | async as movieList; else loading" class="movie-list__content">
        <ul class="movie-list__content-list">
          <app-movie-list-item *ngFor="let movieListItem of movieList" [item]="movieListItem"></app-movie-list-item>
        </ul>
      </div>
    </div>
    <ng-template #loading>
      <app-loader></app-loader>
    </ng-template>
  `,
  providers: [
    MovieListService,
  ],
  styleUrls: ["./movie-list.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListComponent implements OnInit, OnDestroy {

  movieList$: Observable<MovieListItem[]>;
  currentCinemaType: CinemaTypes;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private movieListService: MovieListService,
  ) {
  }

  ngOnInit(): void {
    this.movieList$ = this.movieListService.movieList$;

    this.route.data
      .pipe(
        map((data: { cinemaType: CinemaTypes }) => data.cinemaType),
        takeUntil(this.isDestroyed$),
      )
      .subscribe((cinemaType: CinemaTypes) => {
        this.currentCinemaType = cinemaType;
        this.movieListService.loadMovieList(this.currentCinemaType);
      });
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}
