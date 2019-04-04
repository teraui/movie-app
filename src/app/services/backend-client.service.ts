import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {CinemaTypes} from "../models/cinema-types.enum";
import {Observable} from "rxjs";
import {MovieListItem} from "../models/movie-list-item.model";
import {MovieDetails} from "../models/movie-details.model";

@Injectable()
export class BackendClientService {

  private readonly ROOT_URL: string = "https://cinema-scrapper.herokuapp.com/api/v0.0.1";
  private readonly API_KEY: string = "fsdkflkdsfkl3249023ruif09uv0";

  constructor(
    private httpClient: HttpClient
  ) {}

  loadMovieList(cinemaType: CinemaTypes): Observable<MovieListItem[]> {
    const path: string = this.ROOT_URL + "/" + cinemaType;
    let params = new HttpParams();
    params = params.set("apiKey", this.API_KEY);
    return this.httpClient.get<MovieListItem[]>(path, {observe: "body", responseType: "json", params: params});
  }

  loadMovieDetails(movieId: string, cinemaType: CinemaTypes): Observable<MovieDetails> {
    const path: string = this.ROOT_URL + "/" + cinemaType + "/" + movieId;
    let params = new HttpParams();
    params = params.set("apiKey", this.API_KEY);
    return this.httpClient.get<MovieDetails>(path, {observe: "body", responseType: "json", params: params});
  }
}
