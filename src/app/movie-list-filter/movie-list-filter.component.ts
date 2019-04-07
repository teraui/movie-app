import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from "@angular/core";
import {SelectItem} from "primeng/api";
import {CinemaTypes} from "../models/cinema-types.enum";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MovieListService} from "../movie-list/movie-list.service";
import {Params, Router} from "@angular/router";

@Component({
  selector: "app-movie-list-filter",
  template: `
    <form [formGroup]="movieListFilterForm" class="movie-list-filter">
      <p-dropdown [options]="cinemaTypes"
                  formControlName="cinemaType"
                  (onChange)="loadMovieList()"
                  scrollHeight="600px"
                  [panelStyle]="{'background-color': 'white'}">
      </p-dropdown>
    </form>
  `,
  styleUrls: ["./movie-list-filter.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieListFilterComponent implements OnInit, OnChanges {

  @Input() currentCinemaType: CinemaTypes;

  movieListFilterForm: FormGroup;
  cinemaTypes: SelectItem[] = [];

  constructor(
    private builder: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.cinemaTypes = this.createCinemaTypes();
  }

  ngOnChanges(): void {
    this.movieListFilterForm = this.createFilterForm(this.currentCinemaType);
  }

  createFilterForm(cinemaType: CinemaTypes): FormGroup {
    return this.builder.group({
      cinemaType: [cinemaType]
    });
  }

  createCinemaTypes(): SelectItem[] {
    return [
      ...CinemaTypes.getCinemaTypesData().map(item => {
        return {
          label: item.cyrillicName,
          value: item.displayName,
        };
      })
    ];
  }

  loadMovieList(): void {
    const queryParams: Params = {
      cinemaType: this.movieListFilterForm.value.cinemaType
    };
    this.router.navigate([], {queryParams});
  }
}
