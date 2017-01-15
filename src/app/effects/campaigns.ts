import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {of} from "rxjs/observable/of";
import {Injectable} from "@angular/core";
import {Effect, Actions} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";
import {CampaignsApiService} from "../services/campaigns.api";
import * as campaignsActions from '../actions/campaigns';

@Injectable()
export class CampaignsEffects {
  constructor(private actions$: Actions, private campaignsApi: CampaignsApiService) {
  }

  @Effect()
  fetchCampaigns$: Observable<Action> = this.actions$
    .ofType(campaignsActions.ActionTypes.FETCH)
    .switchMap(() => {
      return this.campaignsApi.fetchCampaigns()
        .map(campaigns => new campaignsActions.FetchCompleteAction(campaigns))
        .catch(() => of(new campaignsActions.FetchCompleteAction([])));
    });
}
