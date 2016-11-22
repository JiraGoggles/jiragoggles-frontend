import { Routes } from '@angular/router';

import { NoContentComponent } from './no-content';
import {ProjectComponent} from "./cardsView/project/project.component";
import {HomeComponent} from "./cardsView/home/home.component";

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'project/:key', component: ProjectComponent},
  { path: '**',    component: NoContentComponent }
];
