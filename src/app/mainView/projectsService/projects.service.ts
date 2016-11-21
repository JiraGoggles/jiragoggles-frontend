/**
 * Created by wiekonek on 10.11.16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class ProjectsService {
  private http:Http;

  constructor(http: Http) {
    this.http = http;
  }

  getData() {
    return this.http
      .get('/card/project')
      .map(res => res.json());
  }
}
