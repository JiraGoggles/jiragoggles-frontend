import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';


/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import { CardComponent } from './card';
import { NoContentComponent } from './no-content';
import {ProjectComponent} from "./cardsView/project/project.component";
import {RootComponent} from "./cardsView/root/root.component";
import { ReadMoreComponent } from "./readMoreComponent/readMore.component";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {AppAuthenticationService} from "./app-authentication.service";
import {ChildCardComponent} from "./card/child-card/child-card.component";
import {ParentCardComponent} from "./card/parent-card/parent-card.component";
import {EpicComponent} from "./cardsView/epic/epic.component";
import {StoryComponent} from "./cardsView/story/story.component";
import {Ng2PaginationModule} from 'ng2-pagination';
import {SessionService} from "./session.service";
import {BreadcrumbItemComponent} from "./breadcrumb/breadcrumb-item/breadcrumb-item.component";
import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';


// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AppAuthenticationService,
  SessionService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    RootComponent,
    ProjectComponent,
    EpicComponent,
    StoryComponent,
    ChildCardComponent,
    ParentCardComponent,
    BreadcrumbComponent,
    BreadcrumbItemComponent,
    NoContentComponent,
    ReadMoreComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    Ng2PaginationModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

