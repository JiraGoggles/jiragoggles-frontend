/**
 * Created by wiekonek on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ProjectService} from "./project.service";
import {ParentCard} from "../../../card/card";
import {Observable} from "rxjs";

@Injectable()
export class RootMockService {

  constructor(private http: Http) {
  }

  get(): Observable<ParentCard[]> {
    return this.http
      .get('/assets/mocks/projects.json')
      .map(res => res.json());
  }
}
