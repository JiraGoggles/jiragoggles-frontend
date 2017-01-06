/**
 * Created by wiekonek on 13.12.16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ParentCard} from "../../card/card";
import {Observable} from "rxjs";
import {PaginateResponse} from "./paginate-response";
import 'rxjs/add/operator/delay';

const delayTime: number = 700;

export abstract class BaseCardMockService {

  constructor(private http: Http) {
  }

  protected abstract get path(): string;

  protected get total(): number {
    return 8;
  }

  get(..._: any[]): Observable<ParentCard[]> {
    return this.http.get(this.path).delay(delayTime).map(res => res.json());
  }

  getPage(page: number, size: number, ...__: any[]): Observable<PaginateResponse<ParentCard>> {
    let start = (page-1)*size;
    return this.http.get(this.path)
      .delay(delayTime)
      .map(res => <PaginateResponse<ParentCard>>{ total: this.total, cards: res.json().slice(start, start + size)});
  }

  rankIssue(id: string, direction: string, referenceId: string) {
    console.log(id, direction, referenceId);
  }
}
