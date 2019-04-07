import {CinemaTypes} from "./cinema-types.enum";

export interface MovieListItem {
  id: string;
  name: string;
  age: string;
  imageUrl: string;
  schedule: string[];
  cinemaType: CinemaTypes;
}
