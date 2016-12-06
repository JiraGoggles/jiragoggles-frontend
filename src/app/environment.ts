
// Angular 2
// rc2 workaround
import { enableDebugTools, disableDebugTools } from '@angular/platform-browser';
import { enableProdMode, ApplicationRef } from '@angular/core';
import {ProjectService} from "./cardsView/services/project/project.service";
import {ProjectMockService} from "./cardsView/services/project/project-mock.service";
import {EpicService} from "./cardsView/services/epic/epic.service";
import {StoryService} from "./cardsView/services/story/story.service";
import {RootService} from "./cardsView/services/root/root.service";
import {RootMockService} from "./cardsView/services/root/root-mock.service";
import {EpicMockService} from "./cardsView/services/epic/epic-mock.service";
import {StoryMockService} from "./cardsView/services/story/story-mock.service";

// Environment Providers
let PROVIDERS: any[] = [
  // common env directives
];

// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
let _decorateModuleRef = function identity<T>(value: T): T { return value; };

if ('production' === ENV) {
  // Production
  disableDebugTools();
  enableProdMode();

  PROVIDERS = [
    ...PROVIDERS,
    RootService,
    ProjectService,
    EpicService,
    StoryService
    // custom providers in production
  ];

} else {

  _decorateModuleRef = (modRef: any) => {
    const appRef = modRef.injector.get(ApplicationRef);
    const cmpRef = appRef.components[0];

    let _ng = (<any>window).ng;
    enableDebugTools(cmpRef);
    (<any>window).ng.probe = _ng.probe;
    (<any>window).ng.coreTokens = _ng.coreTokens;
    return modRef;
  };

  // Development
  PROVIDERS = [
    ...PROVIDERS,
    {provide: RootService, useClass: RootMockService},
    {provide: ProjectService, useClass: ProjectMockService},
    {provide: EpicService, useClass: EpicMockService},
    {provide: StoryService, useClass: StoryMockService}
    // custom providers in development
  ];
}

export const decorateModuleRef = _decorateModuleRef;

export const ENV_PROVIDERS = [
  ...PROVIDERS
];
