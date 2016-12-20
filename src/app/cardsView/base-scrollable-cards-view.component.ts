/**
 * Created by wiekonek on 13.12.16.
 */
import {ParentCard} from "../card/card";
import {Observable} from "rxjs";
import {PaginateResponse} from "./services/paginate-response";


export abstract class BaseScrollableCardsViewComponent {
  readonly perBatch: number = 10;

  cards: Observable<ParentCard[]>;
  currentBatch: number = 1;
  total: number;
  loading: boolean;

  public abstract loadNextBatch() : void;

  public ngOnInit() {
    this.loadNextBatch();
  }

  protected _loadNextBatch(source: Observable<PaginateResponse<ParentCard>>): void {
    this.loading = true;
    this.cards = source
      .do(res => {
        this.total = (<PaginateResponse<ParentCard>>res).total;
        this.loading = false;
      })
      .map(res => (<PaginateResponse<ParentCard>>res).cards);
  }

}
