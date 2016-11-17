import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import {MainViewComponent} from "./mainView/mainView.component";

export const ROUTES: Routes = [
  { path: '',      component: MainViewComponent },
  { path: 'home', component: MainViewComponent},
  { path: '**',    component: NoContentComponent },
];
