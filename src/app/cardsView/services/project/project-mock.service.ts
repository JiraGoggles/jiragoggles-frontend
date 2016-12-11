/**
 * Created by wiekonek on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ProjectService} from "./project.service";
import {ParentCard} from "../../../card/card";
import {Observable} from "rxjs";

@Injectable()
export class ProjectMockService {

  constructor(private http: Http) {
  }

  get(key: string): Observable<ParentCard[]> {
    return this.http
      .get('/assets/mocks/project.json')
      .map(res => res.json());
  }
}
