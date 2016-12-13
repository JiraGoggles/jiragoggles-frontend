/**
 * Created by wiekonek on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ProjectService} from "./project.service";
import {ParentCard} from "../../../card/card";
import {Observable} from "rxjs";
import {BaseCardMockService} from "../base-card-mock.service";

@Injectable()
export class StoryMockService extends BaseCardMockService {
  constructor(http: Http) {
    super(http);
  }

  protected get count() {
    return 13;
  }

  protected get path(): string {
    return '/assets/mocks/story.json';
  }
}
