import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Campaign} from "../models/campaign";

@Injectable()
export class CampaignsApiService {
  private API_PATH: string = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: Http) {}

  fetchCampaigns(): Observable<Campaign[]> {
    return this.http.get(`${this.API_PATH}`)
      .map(res => res.json().items || []);
  }
}
