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
  private readonly pluginAuthenticationKey: string = 'token';

  constructor() {
    let tokenElement = document.getElementsByName('token');
    if(tokenElement != null)
      localStorage.setItem(this.pluginAuthenticationKey, tokenElement[0]['content'])
  }

  public get RequestOptionsWithPluginAuthentication(): RequestOptions {
    let req = new RequestOptions({search: new URLSearchParams()});
    req.search.append('jwt', localStorage.getItem(this.pluginAuthenticationKey));
    return req;
  }
}
