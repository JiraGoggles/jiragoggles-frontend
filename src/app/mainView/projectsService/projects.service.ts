/**
 * Created by wiekonek on 10.11.16.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {ENV_REST_API_URL} from "../../environment";

@Injectable()
export class ProjectsService {
  http:Http;
  constructor(http: Http) {
    this.http = http;
  }

  getData() {
    return this.http
      .get(ENV_REST_API_URL + '/card/project')
      .map(res => res.json());
  }
}
