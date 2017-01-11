/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import {SessionService} from "./session.service";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    'app.component.scss'
  ],
  template: `
    <main class="col-md-12 center-block">
      <div class="row page-header">
        <div class="col-md-6">
          <breadcrumb></breadcrumb>
        </div>
      </div>
      <router-outlet></router-outlet>
    </main>
  `
})

export class AppComponent {
  constructor(
    public appState: AppState,
    private sessionService: SessionService) {
  }

  ngOnInit() {
    this.sessionService.loadLastSession();
    this.sessionService.startSessionUrlUpdate();
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
