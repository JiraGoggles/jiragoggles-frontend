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

  private checkForError(resp: Response): Response {
    console.log(resp.status);
    console.log(resp.json());
    console.log(resp.headers);
    return resp;
  }

  getData() {
    return this.http
      .get(ENV_REST_API_URL + '/projects')
      .map(this.checkForError)
      .map(res => res.json());
  }
}
