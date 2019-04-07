import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {map, takeUntil, tap} from "rxjs/operators";
import {MovieDetailsViewRequest} from "../models/movie-details-view-request.model";
import {MovieDetailsService} from "./movie-details.service";
import {MovieDetails} from "../models/movie-details.model";

@Component({
  selector: "app-movie-details",
  template: `
    <div *ngIf="movieDetails$ | async as movieDetails; else loading"
         [ngClass]="{'movie-details__faded': isFaded}"
         class="movie-details">
      <h1 class="movie-details__header">{{movieDetails.name}}</h1>
      <div class="movie-details__content">
        <div class="movie-details__image">
          <img [src]="movieDetails.imageUrl" [alt]="movieDetails.name" (load)="disableFade()">
        </div>
        <div class="movie-details__description">
          <div *ngIf="movieDetails.description" class="movie-details__description-row">
            <p class="movie-details__description-row-header">Опис фільму</p>
            {{movieDetails.description}}
          </div>
          <div *ngIf="movieDetails.age" class="movie-details__description-row">
            <p class="movie-details__description-row-header">Вік</p>
            {{movieDetails.age}}
          </div>
          <div *ngIf="movieDetails.duration" class="movie-details__description-row">
            <p class="movie-details__description-row-header">Тривалість</p>
            {{movieDetails.duration}}
          </div>
          <div *ngIf="movieDetails.country" class="movie-details__description-row">
            <p class="movie-details__description-row-header">Країна походження</p>
            {{movieDetails.country}}
          </div>
          <div *ngIf="movieDetails.lang" class="movie-details__description-row">
            <p class="movie-details__description-row-header">Мова</p>
            {{movieDetails.lang}}
          </div>
          <div *ngIf="movieDetails.releaseDate" class="movie-details__description-row">
            <p class="movie-details__description-row-header">Дата виходу</p>
            {{movieDetails.releaseDate}}
          </div>
          <div *ngIf="movieDetails.roles" class="movie-details__description-row">
            <p class="movie-details__description-row-header">У ролях</p>
            {{movieDetails.roles}}
          </div>
          <div *ngIf="movieDetails.halls && movieDetails.halls.length" class="movie-details__description-row">
            <p class="movie-details__description-row-header">Сеанси</p>
            {{movieDetails.halls | appHallsPipe}}
          </div>
        </div>
      </div>
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
  isFaded: boolean = true;

  private isDestroyed$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private movieDetailsService: MovieDetailsService,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.movieDetails$ = this.movieDetailsService.movieDetails$
      .pipe(
        tap(d => console.log(d, "moviedetails"))
      );

    this.route.data
      .pipe(
        map((data: { viewRequest: MovieDetailsViewRequest }) => data.viewRequest),
        takeUntil(this.isDestroyed$)
      )
      .subscribe((viewRequest: MovieDetailsViewRequest) => {
        this.isFaded = true;
        this.movieDetailsService.loadMovieDetails(viewRequest.movieId, viewRequest.cinemaType);
      });
  }

  disableFade(): void {
    this.isFaded = false;
    this.changeDetector.markForCheck();
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }
}
