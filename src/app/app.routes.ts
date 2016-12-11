import { Routes } from '@angular/router';
import {ProjectComponent} from "./cardsView/project/project.component";
import {RootComponent} from "./cardsView/root/root.component";
import {EpicComponent} from "./cardsView/epic/epic.component";
import {StoryComponent} from "./cardsView/story/story.component";

export const ROUTES: Routes = [
  { path: '', component: RootComponent },
  { path: 'project/:projectKey', component: ProjectComponent},
  { path: 'project/:projectKey/:epicKey', component: EpicComponent},
  { path: 'project/:projectKey/:epicKey/:storyKey', component: StoryComponent},
  { path: '**', redirectTo: '' }
];
