import '@ngrx/core/add/operator/select';
import { createSelector } from 'reselect';
import {Observable} from "rxjs/Observable";
import {Campaign} from "../models/campaign";
import * as campaignsActions from "../actions/campaigns";


export interface State {
  ids: string[];
  entities: { [id: string]: Campaign };
  loading: boolean;
  selectedCampaignId: string | null;
};

const initialState: State = {
  ids: [],
  entities: {},
  loading: false,
  selectedCampaignId: null,
};

export function reducer(state = initialState, action: campaignsActions.Actions ): State {

  switch (action.type) {
    case campaignsActions.ActionTypes.FETCH: {
      return {
        ids: [],
        entities: {},
        loading: true,
        selectedCampaignId: null,
      }
    }
    case campaignsActions.ActionTypes.FETCH_COMPLETE: {
      const campaigns = action.payload;

      const campaignsIds = campaigns.map(campaign => campaign.id);
      const campaignEntities = campaigns.reduce((entities: { [id: string]: Campaign }, campaign: Campaign) => {
        return Object.assign(entities, {
          [campaign.id]: campaign
        });
      }, {});

      return {
        ids: [ ...state.ids, ...campaignsIds ],
        entities: Object.assign({}, state.entities, campaignEntities),
        selectedCampaignId: state.selectedCampaignId,
        loading: false
      }
    }
    default:
      return state;
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export function getStatus(state$: Observable<State>) {
  return state$.select(state => state.loading);
}

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedCampaignId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
