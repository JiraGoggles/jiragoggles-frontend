/**
 * Created by wiekonek on 10.11.16.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptions, URLSearchParams} from "@angular/http";
import {Card} from "../../../card/card";
import {Observable} from "rxjs";
import {CardsService} from "../cards-service";

@Injectable()
export class ProjectService implements CardsService {

  private options: RequestOptions;

  constructor(protected http: Http) {
    let searchParams = new URLSearchParams();
    let tokenElement = document.getElementsByName('token');
    searchParams.append('jwt', tokenElement.length > 0 ? tokenElement[0]['content'] : 'example-token');
    this.options = new RequestOptions({
      search: searchParams
    });
  }

  getAll(): Observable<Card[]> {

    return this.http
      .get('api/card/project', this.options)
      .map(res => res.json());
  }

  get(key: string): Observable<Card[]> {
    return this.http
      .get('api/card/project/' + key, this.options)
      .map(res => res.json());
  }
}
