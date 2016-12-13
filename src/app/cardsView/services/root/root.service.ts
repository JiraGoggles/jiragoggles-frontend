/**
 * Created by wiekonek on 10.11.16.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import {ParentCard} from "../../../card/card";
import {Observable} from "rxjs";
import {CardsService} from "../cards-service";
import {AppAuthenticationService} from "../../../app-authentication.service";
import {PaginateResponse} from "../paginate-response";
import {BaseCardService} from "../base-card.service";

@Injectable()
export class RootService extends BaseCardService {
  constructor(protected http: Http, pluginAuth: AppAuthenticationService) {
    super(http, pluginAuth);
  }

  get(): Observable<ParentCard[]> {
    return this._get<ParentCard[]>('api/card/project');
  }

  getPage(page: number, size: number): Observable<PaginateResponse<ParentCard>> {
    return this._getPage<ParentCard>('api/card/project', page, size);
  }
}
