import { Routes } from '@angular/router';
import { CampaignsPageComponent } from './scenes/campaigns-page';
import { NotFoundPageComponent } from './scenes/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: CampaignsPageComponent
  },
  {
    path: 'campaigns',
    component: CampaignsPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
