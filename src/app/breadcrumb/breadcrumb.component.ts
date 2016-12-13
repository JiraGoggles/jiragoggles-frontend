import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {BreadcrumbItem, ProjectBreadcrumbItem, IssueBreadcrumbItem} from "./breadcrumb";
import 'rxjs/add/operator/filter';
import {ProjectService} from "../cardsView/services/project/project.service";
import {RootService} from "../cardsView/services/root/root.service";
import {ParentCard} from "../card/card";
import {EpicService} from "../cardsView/services/epic/epic.service";

@Component({
  selector: 'breadcrumb',
  templateUrl: 'breadcrumb.component.html'
})

export class BreadcrumbComponent implements OnInit {

  private rootItem: BreadcrumbItem = { url: '/', key: 'Root' }; // always available
  private projectItem: ProjectBreadcrumbItem = null;
  private epicItem: IssueBreadcrumbItem = null;
  private storyItem: IssueBreadcrumbItem = null;

  // TODO possibly a better idea would be to inject one service that delegates tasks to separate services
  constructor(private router: Router, private rootService: RootService,
              private projectService: ProjectService, private epicService: EpicService) {
  }

  ngOnInit() {
    this.router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe((navEvent: NavigationEnd) => this.setBreadcrumbItems(navEvent.url));
  }

  private setBreadcrumbItems(url: string) {
    const urlParts = url.split('/').filter(part => part !== '');

    this.projectItem = this.epicItem = this.storyItem = null;
    var projectKey, epicKey, storyKey;
    projectKey = epicKey = storyKey = null;

    if (urlParts.length > 1) {
      projectKey = urlParts[1];
      this.rootService.get()
        .subscribe((projects: ParentCard[]) => this.projectItem = this.convertToProjectItem(this.findCardByKey(projects, projectKey)));
    }

    if (urlParts.length > 2) {
      epicKey = urlParts[2];
      this.projectService.get(epicKey)
        .subscribe((epics: ParentCard[]) => this.epicItem = this.convertToIssueItem(this.findCardByKey(epics, epicKey), projectKey));
    }

    if (urlParts.length > 3) {
      storyKey = urlParts[3];
      this.epicService.get(projectKey, epicKey)
        .subscribe((stories: ParentCard[]) => this.storyItem = this.convertToIssueItem(this.findCardByKey(stories, storyKey), projectKey, epicKey));
    }
  }

  private convertToProjectItem(card: ParentCard): ProjectBreadcrumbItem {
    if (card) {
      const url = '/project/' + card.key;
      const key = 'Project [' + card.key + ']';
      const name = card.name;
      return { url, key, name };
    }
    else
      return null;
  }

  private convertToIssueItem(card: ParentCard, ...keys: string[]): IssueBreadcrumbItem {
    if (card) {
      const url = '/project/' + [...keys, card.key].join('/');
      const key = this.capitalize(card.type) + ' [' + card.key + ']';
      const name = card.name;
      const priorityImgUrl = card.priorityImgUrl;
      return { url, key, name, priorityImgUrl };
    }
    else
      return null;
  }

  //TODO maybe there's something similar to 'find' method from ES6 in Typescript already?
  private findCardByKey(cards: ParentCard[], key: string): ParentCard {
    const filtered = cards.filter(card => card.key === key);
    if (filtered.length === 1) // basically, it should always be true
      return filtered[0];
    else
      return null;
  }

  // it doesn't really belong here but it probably won't be needed anywhere else
  private capitalize(str: string) {
    if (str && str.length > 0)
      return str.charAt(0).toUpperCase() + str.slice(1);
    else
      return str;
  }
}

