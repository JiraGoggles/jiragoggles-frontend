import { Routes } from '@angular/router';

import { NoContentComponent } from './no-content';
import {ProjectComponent} from "./cardsView/project/project.component";
import {RootComponent} from "./cardsView/root/root.component";

export const ROUTES: Routes = [
  { path: '',      component: RootComponent },
  { path: 'project/:key', component: ProjectComponent},
  { path: '**',    redirectTo: '' }
];
