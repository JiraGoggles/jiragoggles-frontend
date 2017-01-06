/**
 * Created by wiekonek on 13.12.16.
 */
import {ParentCard} from "../card/card";
import {Observable} from "rxjs";
import {PaginateResponse} from "./services/paginate-response";
import {RankService} from "./services/rank/rank.service";


export abstract class BasePaginateCardComponent {
  perPage: number = 4;

  cards: Observable<ParentCard[]>;
  p: number = 1;
  total: number;
  loading: boolean;

  constructor(private rankService: RankService) {
  }

  public abstract getPage(page: number) : void;

  public ngOnInit() {
    this.getPage(1);
  }

  protected _getPage(page: number, source: Observable<PaginateResponse<ParentCard>>): void {
    this.loading = true;
    this.cards = source
      .do(res => {
        this.total = (<PaginateResponse<ParentCard>>res).total;
        this.loading = false;
        this.p = page;
      })
      .map(res => (<PaginateResponse<ParentCard>>res).cards);
  }

  onRankChangeRequest(args: string[]) {
    let callerId: string = args[0];
    let direction: string = args[1];
    let caller = document.getElementById(callerId);
    let parent = document.getElementById('main-row');

    if (direction == 'left') {
      this.rankUp(caller, parent);
    } else if (direction == 'right') {  //there might be other directions added like max-left and max-right
      this.rankDown(caller, parent);
    }
  }

  private rankUp(caller: Element, parent: Element) {
    let neighbor = caller.previousElementSibling;
    if (neighbor !== null) {
      this.rankService.rankIssue(caller.id, "Before", neighbor.id);
      parent.insertBefore(caller, neighbor);

    }
  }

  private rankDown(caller: Element, parent: Element) {
    let neighbor = caller.nextElementSibling;
    if (neighbor !== null) {
      this.rankService.rankIssue(caller.id, "After", neighbor.id);
      parent.insertBefore(neighbor, caller);
    }
  }
}
