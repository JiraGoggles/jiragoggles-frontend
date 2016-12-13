/**
 * Created by wiekonek on 09.11.16.
 */
import {Component} from '@angular/core';
import {ParentCard} from "../../card/card";
import {RootService} from "../services/root/root.service";
import {Observable} from "rxjs";


@Component({
  selector: 'test',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ]
})

export class RootComponent {
  private cards: Observable<ParentCard[]>;

  p: number = 1;
  total: number;
  loading: boolean;
  perPage: number = 4;

  constructor(private rootService: RootService) {
  }

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.loading = true;
    this.cards = this.rootService
      .getPage(page, 4)
      .do(res => {
        this.total = res.count;
        this.loading = false;
        this.p = page;
      })
      .map(res => res.cards);
  }

}
