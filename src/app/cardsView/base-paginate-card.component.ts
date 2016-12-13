/**
 * Created by wiekonek on 13.12.16.
 */
import {ParentCard} from "../card/card";
import {Observable} from "rxjs";
import {PaginateResponse} from "./services/paginate-response";


export abstract class BasePaginateCardComponent {
  perPage: number = 4;

  cards: Observable<ParentCard[]>;
  p: number = 1;
  total: number;
  loading: boolean;

  public abstract getPage(page: number) : void;

  public ngOnInit() {
    this.getPage(1);
  }

  protected _getPage(page: number, source: Observable<PaginateResponse<ParentCard>>): void {
    this.loading = true;
    this.cards = source
      .do(res => {
        this.total = (<PaginateResponse<ParentCard>>res).count;
        this.loading = false;
        this.p = page;
      })
      .map(res => (<PaginateResponse<ParentCard>>res).cards);
  }

}
