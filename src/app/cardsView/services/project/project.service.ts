/**
 * Created by wiekonek on 10.11.16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Card} from "../../../card/card";
import {Observable} from "rxjs";
import {CardsService} from "../cards-service";

@Injectable()
export class ProjectService implements CardsService {

  constructor(protected http: Http) {}

  getAll(): Observable<Card[]> {
    return this.http
      .get('/card/project')
      .map(res => res.json());
  }

  get(key: string): Observable<Card[]> {
    return this.http
      .get('/card/project/' + key)
      .map(res => res.json());
  }
}
