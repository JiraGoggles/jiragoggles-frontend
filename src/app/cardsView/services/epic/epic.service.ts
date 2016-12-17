/**
 * Created by wiekonek on 10.11.16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ParentCard} from "../../../card/card";
import {Observable} from "rxjs";
import {AppAuthenticationService} from "../../../app-authentication.service";
import {BaseCardService} from "../base-card.service";
import {PaginateResponse} from "../paginate-response";

@Injectable()
export class EpicService extends BaseCardService{
  constructor(protected http: Http, pluginAuth: AppAuthenticationService) {
    super(http, pluginAuth);
  }

  get(projectKey: string, key: string): Observable<ParentCard[]> {
    return this._get<ParentCard[]>('api/card/project/' + projectKey + '/'+ key);
  }

  getPage(page: number, size: number, projectKey: string, key: string): Observable<PaginateResponse<ParentCard>> {
    return this._getPage<ParentCard>('api/card/project/' + projectKey + '/'+ key, page, size);
  }
}
