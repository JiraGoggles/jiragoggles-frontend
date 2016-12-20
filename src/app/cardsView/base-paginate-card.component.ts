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
        this.total = (<PaginateResponse<ParentCard>>res).total;
        this.loading = false;
        this.p = page;
      })
      .map(res => (<PaginateResponse<ParentCard>>res).cards);
  }

  onRankChangeRequest(args: string[]) {
    let callerId: string = args[0];
    let direction: string = args[1];
    let neighbor: Element;
    let caller: Element = document.getElementById(callerId);
    let parent: Element;

    if (direction == 'left') {
      neighbor = document.getElementById(callerId).previousElementSibling;
    } else if (direction == 'right') {  //there might be other directions added like max-left and max-right
      neighbor = document.getElementById(callerId).nextElementSibling;
    }
    if (neighbor !== null) {
      parent = document.getElementById('main-row');
      if (direction == 'left'){
        parent.insertBefore(caller, neighbor);
      } else if (direction == 'right') {
        parent.insertBefore(neighbor, caller);
      }
    }
  }

  public onParentDrop($event) : void {
    console.log($event);
  }
}
