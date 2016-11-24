import {Observable} from "rxjs";
import {Card} from "../../card/card";
/**
 * Created by wiekonek on 22.11.16.
 */

export interface CardsService {
  get(key): Observable<Card[]>;
}
