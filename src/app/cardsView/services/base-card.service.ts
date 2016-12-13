/**
 * Created by wiekonek on 13.12.16.
 */
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs";
import {AppAuthenticationService} from "../../app-authentication.service";
import {PaginateResponse} from "./paginate-response";
import {Card} from "../../card/card";

export abstract class BaseCardService {

  constructor(protected http: Http, protected pluginAuth: AppAuthenticationService) {}

  protected _get<T>(path: string, params?: URLSearchParams): Observable<T> {
   let req = new RequestOptions({search: this.pluginAuth.RequestOptionsWithPluginAuthentication.search});
   if(params != null)
     req.search.appendAll(params);
   return this.http
     .get(path, req)
     .map(res => res.json());
  }

  protected _getPage<T extends Card>(path: string, page: number, size: number): Observable<PaginateResponse<T>> {
    return this._get(path, this.paginationParams(page, size));
  }


  private paginationParams(page: number, size: number): URLSearchParams {
    let params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
    return params;
  }
}