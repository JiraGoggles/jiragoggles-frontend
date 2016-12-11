/**
 * Created by wiekonek on 11.12.16.
 */
import {Injectable} from "@angular/core";
import {Router, NavigationEnd} from "@angular/router";
import 'rxjs/add/operator/take';

const sessionKeyword: string = "session";

@Injectable()
export class SessionService  {

  constructor(private router: Router) {
  }

  public startSessionUrlUpdate(): void {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe(e => localStorage.setItem(sessionKeyword, e.url));
  }


  public loadLastSession(): void {
    let lastPath = localStorage.getItem(sessionKeyword);
    this.router.events
      .take(1)
      .subscribe(_ => this.router.navigate(lastPath == null ? [''] : [lastPath]));
  }
}
