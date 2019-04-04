import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from "@angular/core";
import {MovieListItem} from "../models/movie-list-item.model";

@Component({
  selector: "app-movie-list-item",
  template: `
    <li [ngClass]="{'movie-list-item__faded': isFaded}" class="movie-list-item">
      <a class="movie-list-item__link" [routerLink]="'/movie/' + item.id" [queryParams]="{cinemaType: item.cinemaType}">
        <p class="movie-list-item__title">{{item.name}}</p>
        <img class="movie-list-item__image" [src]="item.imageUrl" (load)="disableFade()"/>
      </a>
    </li>
  `,
  styleUrls: ["./movie-list-item.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListItemComponent {
  @Input() item: MovieListItem;
  isFaded: boolean = true;
  constructor(
    private changeDetector: ChangeDetectorRef,
  ) {}

  disableFade(): void {
    this.isFaded = false;
    this.changeDetector.markForCheck();
  }
}
