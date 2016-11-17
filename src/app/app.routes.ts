import {Routes} from "@angular/router";
import {NoContentComponent} from "./no-content";
import {MainViewComponent} from "./mainView/mainView.component";
import {HelloWoldComponent} from "./helloWorld.component";

export const ROUTES: Routes = [
  { path: '',      component: MainViewComponent },
  { path: 'home', component: MainViewComponent},
  { path: 'hello', component: HelloWoldComponent},
  { path: '**',    component: NoContentComponent },
];
