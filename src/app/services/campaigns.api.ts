import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Campaign} from "../models/campaign";

@Injectable()
export class CampaignsApiService {
  private API_PATH: string = '/api/campaigns';

  constructor(private http: Http) {
  }

  fetchCampaigns(): Observable<Campaign[]> {
    return this.http.get(`${this.API_PATH}`)
      .map(res => {
        return res.json() || []
      });
  }
}
