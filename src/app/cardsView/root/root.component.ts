/**
 * Created by wiekonek on 09.11.16.
 */
import {Component} from '@angular/core';
import {Card} from "../../card/card";
import {RootService} from "../services/root/root.service";

@Component({
  selector: 'test',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ],
})

export class RootComponent {
  private cards:Card[] = [];

  constructor(private projectsService: RootService) {
  }

  ngOnInit() {
    this.projectsService.get()
      .subscribe(resp => this.cards = resp);
  }
}
