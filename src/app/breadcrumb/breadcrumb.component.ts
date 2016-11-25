import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";
import {BreadcrumbItem} from "./breadcrumb";
import 'rxjs/add/operator/filter';

@Component({
  selector: 'breadcrumb',
  templateUrl: 'breadcrumb.component.html'
})

export class BreadcrumbComponent implements OnInit {

  private levelNames: string[];
  private items: BreadcrumbItem[];

  constructor(private router: Router) {
    this.levelNames = ['Root', 'Project', 'Issue'];
    this.parseUrlToBreadcrumbItems('/');
  }

  private parseUrlToBreadcrumbItems(url: string) {
    const parts = url.split('/').filter(part => part !== '');

    this.items = [];
    //the root item is always displayed
    const rootItem: BreadcrumbItem = { url: '/', name: this.levelNames[0], isActive: false };
    this.items.push(rootItem);

    for (let i = 2; i <= parts.length; i++) {
      const url = parts.slice(0, i).join('/');
      const projectItem: BreadcrumbItem = { url, name: this.levelNames[i - 1] + ' [' + parts[i - 1] + ']', isActive: false };
      this.items.push(projectItem);
    }

    //set the last item as active
    this.items[this.items.length - 1].isActive = true;
  }

  ngOnInit() {
    this.router.events
      .filter((event: any) => event instanceof NavigationEnd)
      .subscribe((navEvent: NavigationEnd) => this.parseUrlToBreadcrumbItems(navEvent.url));
  }
}

