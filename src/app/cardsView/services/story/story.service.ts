/**
 * Created by wiekonek on 10.11.16.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Card} from "../../../card/card";
import {Observable} from "rxjs";
import {CardsService} from "../cards-service";
import {AppAuthenticationService} from "../../../app-authentication.service";

@Injectable()
export class StoryService {
  constructor(protected http: Http, private pluginAuth: AppAuthenticationService) {
  }

  get(projectKey: string, epicKey: string, key: string): Observable<Card[]> {
    return this.http
      .get('api/card/project/' + projectKey + '/' + epicKey + '/' + key, this.pluginAuth.RequestOptionsWithPluginAuthentication)
      .map(res => res.json());
  }
}
