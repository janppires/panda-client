import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { CampaignsApiService } from "../services";
import { ActionTypes, FetchCompleteAction } from '../actions/campaigns';


@Injectable()
export class CampaignsEffects {
  constructor(private actions$: Actions, private campaignsApi: CampaignsApiService) {
  }

  @Effect() fetchCampaigns$: Observable<Action> = this.actions$
    .ofType(ActionTypes.FETCH)
    .switchMap(() => {
      return this.campaignsApi.fetchCampaigns()
        .map(campaigns => new FetchCompleteAction(campaigns))
        .catch(() => of(new FetchCompleteAction([])));
    });
}
