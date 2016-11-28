/**
 * Created by wiekonek on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ProjectService} from "./project.service";
import {Card} from "../../../card/card";
import {Observable} from "rxjs";

@Injectable()
export class ProjectsMockService {

  constructor(private http: Http) {
  }

  getAll(): Observable<Card[]> {
    return this.http
      .get('/assets/mocks/projects.json')
      .map(res => res.json());
  }

  get(key: string): Observable<Card[]> {
    return this.http
      .get('/assets/mocks/project.json')
      .map(res => res.json());
  }
}
