/**
 * Created by wiekonek on 11.12.16.
 */
import {Injectable} from "@angular/core";
import {Router, NavigationEnd} from "@angular/router";
import 'rxjs/add/operator/take';

const sessionKeyword: string = "-last_session";
@Injectable()
export class SessionService  {

  public JiraInstance = "";

  constructor(private router: Router) {
    this.JiraInstance = document.location.href.split('/')[2];
    console.log(this.JiraInstance);
  }

  public startSessionUrlUpdate(): void {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe(e => localStorage.setItem(this.JiraInstance + sessionKeyword, e.url));
  }

  public loadLastSession(): void {
    let lastPath = localStorage.getItem(this.JiraInstance + sessionKeyword);
    this.router.events
      .take(1)
      .subscribe(_ => this.router.navigate(lastPath == null ? [''] : [lastPath]));
  }
}
