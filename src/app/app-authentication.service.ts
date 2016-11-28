/**
 * Created by wiekonek on 28.11.16.
 */
/**
 * Created by wiekonek on 10.11.16.
 */
import {Injectable} from "@angular/core";
import {URLSearchParams, RequestOptions} from "@angular/http";

@Injectable()
export class AppAuthenticationService {
  // private readonly pluginAuthenticationKey: string = 'token';
  private _options: RequestOptions;

  constructor() {
    let searchParams = new URLSearchParams();
    let tokenElement = document.getElementsByName('token');

    searchParams.append('jwt',
      tokenElement !== null && tokenElement.length > 0 ? tokenElement[0]['content'] : 'empty-token');
    this._options = new RequestOptions({
      search: searchParams
    });

    // sessionStorage.setItem(this.pluginAuthenticationKey, JSON.stringify(this.options));
  }

  public get RequestOptionsWithPluginAuthentication(): RequestOptions {
    // return <RequestOptions>JSON.parse(sessionStorage.getItem(this.pluginAuthenticationKey));
    return this._options;
  }
}
