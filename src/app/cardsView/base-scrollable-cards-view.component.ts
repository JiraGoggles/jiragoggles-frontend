/**
 * Created by wiekonek on 13.12.16.
 */
import {ParentCard} from "../card/card";
import {Observable} from "rxjs";
import {PaginateResponse} from "./services/paginate-response";
import * as $ from 'jquery';

// required because the corresponding library is available only after the addon has been loaded in the iframe
declare var AP: any;

export abstract class BaseScrollableCardsViewComponent {
  readonly perBatch: number = 12;

  cards: ParentCard[];
  nextBatchNumber: number = 1;
  total: number;
  loading: boolean = false;

  shouldHandleCustomResizeEvent: boolean = false;
  containerScrollbarConfig = { suppressScrollY: true };
  columnScrollbarConfig = { suppressScrollX: true };

  public abstract loadNextBatch() : void;

  public ngOnInit() {
    this.registerWindowResizeEventHandler();
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

      this.loading = false;

      // force an update of the horizontal scrollbar
      // otherwise it gets stuck at its end position after loading a batch
      const container = document.getElementsByClassName('container-scrollable')[0];
      container.scrollLeft -= 10;

      // react to possible changes of the container size that may happen after the batch has been loaded
      setTimeout(() => this.updateContainerHeight(), 0);
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

  private updateContainerHeight() {
    // if the addon is not being loaded within the iframe then the 'AP' object is not available
    try {
      AP.sizeToParent(true);
    }
    catch (ex) {} // in the dev mode it's not that important - ignore it

    this.shouldHandleCustomResizeEvent = true;
    $(window).trigger('resize', 'custom');
  }

  private registerWindowResizeEventHandler() {
    $(window).resize((e, eventType) => {
      // if the event isn't 'ours' then we handle it no matter what (it's usually raised by the iframe)
      // otherwise we perform an additional check
      if (typeof eventType === 'undefined' || this.shouldHandleCustomResizeEvent) {

        const headerTopSpace = parseInt($('.page-header').css('margin-top'), 10) +
          parseInt($('.page-header').css('padding-top'), 10);
        const headerBottomSpace = parseInt($('.page-header').css('margin-bottom'), 10) +
          parseInt($('.page-header').css('padding-bottom'), 10);
        const headerTotalHeight = $('.page-header').height() + headerTopSpace + headerBottomSpace;

        const footerHeight = $('.footer').height();

        let maxHeightLeft = $(window).height() - headerTotalHeight - footerHeight - 20;

        if (maxHeightLeft >= 350) { // if maxHeightLeft isn't even 350 px then it's going to look bad anyway
          $('.base-cards-view').height(maxHeightLeft);
          $('.card-column').height(maxHeightLeft);
        }

        this.shouldHandleCustomResizeEvent = false;
      }
    });
  }
}
