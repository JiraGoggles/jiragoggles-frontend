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

  containerScrollbarConfig = { suppressScrollY: true };
  columnScrollbarConfig = { suppressScrollX: true };

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

  protected scrolledToEnd(event: any): void {
    // TODO could not find any other way to determine whether the event comes from the horizontal (container, not column) scrollbar
    const isContainerScrollbarEvent = event.srcElement.className.indexOf('ps-active-x') !== -1;
  }
}
