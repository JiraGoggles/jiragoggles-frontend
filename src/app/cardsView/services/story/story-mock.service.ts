/**
 * Created by wiekonek on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseCardMockService} from "../base-card-mock.service";

@Injectable()
export class StoryMockService extends BaseCardMockService {
  constructor(http: Http) {
    super(http);
  }

  protected get path(): string {
    return '/assets/mocks/story.json';
  }
}
