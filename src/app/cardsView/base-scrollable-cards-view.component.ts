/**
 * Created by wiekonek on 13.12.16.
 */
import {ParentCard} from "../card/card";
import {Observable} from "rxjs";
import {PaginateResponse} from "./services/paginate-response";
import * as $ from 'jquery';
import {RankService} from "./services/rank/rank.service";

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
  columnScrollbarConfig = { suppressScrollX: true, suppressScrollY: false };

    constructor(private rankService: RankService) {
    }

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
      const container = document.getElementsByClassName('main-container')[0];
      container.scrollLeft -= 10;

      setTimeout(() => { this.updateWindowHeight(); this.updateSubContainerWidth(); }, 0);
    });
  }

  dropSuccess($event) {
      let dropped = document.getElementById($event+"-subCard");
      let prevNeighbor = dropped.previousElementSibling;
      let nextNeighbor = dropped.nextElementSibling;

      if (prevNeighbor !== null) {
          this.rankService.rankIssue(dropped.id.slice(0, -8), "After", prevNeighbor.id.slice(0, -8));
      }
      else if (nextNeighbor !== null) {
          this.rankService.rankIssue(dropped.id.slice(0, -8), "Before", nextNeighbor.id.slice(0, -8));
      }
  }

  onRankChangeRequest(args: string[]) {
      let callerId: string = args[0];
      let direction: string = args[1];
      let caller = document.getElementById(callerId);
      let parent = document.getElementById('perfect-scrollbar').children[0];

      if (direction == 'left') {
          this.rankUp(caller, parent);
      } else if (direction == 'right') {  //there might be other directions added like max-left and max-right
          this.rankDown(caller, parent);
      }
  }

  private rankUp(caller: Element, parent: Element) {
      let neighbor = caller.previousElementSibling;
      if (neighbor !== null) {
          if (neighbor.id === "OTHERS")
              return;
          this.rankService.rankIssue(caller.id, "Before", neighbor.id);
          parent.insertBefore(caller, neighbor);

      }
  }

  private rankDown(caller: Element, parent: Element) {
      let neighbor = caller.nextElementSibling;
      if (neighbor !== null) {
          if (neighbor.id === "OTHERS")
              return;
          this.rankService.rankIssue(caller.id, "After", neighbor.id);
          parent.insertBefore(neighbor, caller);
      }
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

  private updateWindowHeight() {
    // if the addon is not being loaded within the iframe then the 'AP' object is not available
    try {
      AP.sizeToParent(true);
    }
    catch (ex) {} // in the dev mode it's not that important - ignore it

    this.shouldHandleCustomResizeEvent = true;
    $(window).trigger('resize', 'custom');
  }

  private updateSubContainerWidth() {
    const actualWidth = $('.card-row').width() * this.cards.length;
    const parentWidth = $('.main-container').width();
    const finalWidth = Math.max(actualWidth, parentWidth);

    $('.sub-container').width(finalWidth);
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

        let mainContainerHeight = $(window).height() - headerTotalHeight - footerHeight - 20;

        if (mainContainerHeight >= 350) { // if mainContainerHeight isn't even 350 px then we don't make any adjustments
          $('.main-container').height(mainContainerHeight);

          const cardRowTopSpace = parseInt($('.card-row').css('padding-top'), 10);
          const cardRowBottomSpace = parseInt($('.card-row').css('padding-bottom'), 10);
          const cardRowTotalHeight = $('.card-row').height() + cardRowTopSpace + cardRowBottomSpace;
          $('.sub-container').height(mainContainerHeight - cardRowTotalHeight);
        }

        this.shouldHandleCustomResizeEvent = false;
      }
    });
  }
}
