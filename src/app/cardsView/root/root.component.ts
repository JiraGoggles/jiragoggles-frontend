/**
 * Created by wiekonek on 09.11.16.
 */
import {Component} from '@angular/core';
import {RootService} from "../services/root/root.service";
import {BasePaginateCardComponent} from "../base-paginate-card.component";


@Component({
  selector: 'test',
  templateUrl: '../base-view.component.html',
  styleUrls: [ '../base-view.component.css' ]
})
export class RootComponent extends BasePaginateCardComponent {
  constructor(private rootService: RootService) {
    super();
  }

  getPage(page: number) {
    this._getPage(page, this.rootService.getPage(page, 4));
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
      this.rootService.rankIssue(caller.id, "Before", neighbor.id);
      parent.insertBefore(caller, neighbor);

    }
  }

  private rankDown(caller: Element, parent: Element) {
    let neighbor = caller.nextElementSibling;
    if (neighbor !== null) {
      this.rootService.rankIssue(caller.id, "After", neighbor.id);
      parent.insertBefore(neighbor, caller);
    }
  }

}
