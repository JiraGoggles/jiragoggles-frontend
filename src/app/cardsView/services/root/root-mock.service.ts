/**
 * Created by wiekonek on 21.11.16.
 */
import {Injectable} from "@angular/core";
import {BaseCardMockService} from "../base-card-mock.service";
import {Http} from "@angular/http";

@Injectable()
export class RootMockService extends BaseCardMockService {
  constructor(http: Http) {
    super(http);
  }

  protected get path(): string {
    return '/assets/mocks/root.json';
  }
}
