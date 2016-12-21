/**
 * Created by wiekonek on 13.12.16.
 */
import {ParentCard} from "../card/card";
import {Observable} from "rxjs";
import {PaginateResponse} from "./services/paginate-response";
import * as $ from 'jquery';

export abstract class BaseScrollableCardsViewComponent {
  readonly perBatch: number = 10;

  cards: ParentCard[];
  nextBatchNumber: number = 1;
  total: number;
  loading: boolean = false;

  containerScrollbarConfig = { suppressScrollY: true };
  columnScrollbarConfig = { suppressScrollX: true };

  public abstract loadNextBatch() : void;

  public ngOnInit() {
    this.loadNextBatch();
  }

  protected _loadNextBatch(source: Observable<PaginateResponse<ParentCard>>): void {
    this.loading = true;
    source.subscribe((res: PaginateResponse<ParentCard>) => {
      this.total = res.total;
      if (this.cards)
        this.cards.push(...res.cards);
      else
        this.cards = res.cards;
      this.nextBatchNumber++;

      // immediately assigning a new state to the 'loading' variable here would
      // lead to blinking while loading the batch in the browser
      setTimeout(() => this.loading = false, 0);
    });
  }

  protected scrolledToEnd(event: any): void {
    // TODO couldn't find any better way to determine whether the event comes from the horizontal scrollbar
    const isContainerScrollbarEvent = event.target.className.indexOf('ps-active-x') !== -1;

    if (isContainerScrollbarEvent && !this.loading) {
      // now, when we're sure the cards aren't loading, we can count them
      const loadedSoFar = (this.nextBatchNumber - 1) * this.perBatch;
      if (loadedSoFar < this.total) {
        this.loading = true;
        this.loadNextBatch();
      }
    }
  }

  //TODO not sure if it belongs in here or in some more general component
  public ngAfterViewInit() {
    $(window).resize(() => {
      const headerSize = $('.page-header').height() + 2 * 30; // 2 * margin/padding
      const maxHeightLeft = $(window).height() - headerSize;

      // taking into consideration the fact that the add-on will be contained within an iframe etc.
      // don't go under 400px though
      const containerHeight = Math.max(maxHeightLeft - 60, 600);
      $('.base-cards-view').height(containerHeight);
      $('.card-column').height(containerHeight);
    });
  }
}
