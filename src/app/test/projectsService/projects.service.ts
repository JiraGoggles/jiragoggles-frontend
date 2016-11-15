/**
 * Created by wiekonek on 10.11.16.
 */
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

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
      .get('/projects')
      // .get('http://localhost:4000/projects')
      .map(this.checkForError)
      .map(res => res.json());

    // return [
    //   {name: "DataTitle 1", key: "KEY1"},
    //   {name: "DataTitle 2", key: "KEY2"},
    //   {name: "DataTitle 3", key: "KEY3"},
    //   {name: "DataTitle 4", key: "KEY4"},
    //   {name: "DataTitle 5", key: "KEY5"}
    // ]
  }
}
