import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';
import {Observable} from "rxjs";
import {Campaign} from "../../models/campaign";
import {FetchAction} from "../../actions/campaigns";

@Component({
  selector: 'app-campaigns-page',
  templateUrl: './campaigns-page.html',
  styleUrls: ['./campaigns-page.css']
})
export class CampaignsPageComponent implements OnInit {

  campaigns$: Observable<Campaign[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.campaigns$ = store.select(fromRoot.getCampaigns);
    this.loading$ = store.select(fromRoot.getCampaignsLoadingStatus)
  }

  ngOnInit() {
    this.store.dispatch(new FetchAction());
  }
}
