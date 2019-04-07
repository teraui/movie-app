import {CinemaTypes} from "./cinema-types.enum";

export class MovieDetailsViewRequest {
  movieId: string;
  cinemaType: CinemaTypes;
}
