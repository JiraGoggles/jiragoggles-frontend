/**
 * Created by wiekonek on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class ProjectsMockService {
  private http:Http;

  constructor(http: Http) {
    this.http = http;
  }


  getData() {

    return this.http
      .get('/assets/mocks/projects.json')
      .map(res => res.json());
  }
}
