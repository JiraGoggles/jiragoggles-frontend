/**
 * Created by wiekonek on 11.12.16.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ParentCard} from "../card";

enum StatusType {
  TO_DO,
  IN_PROGRESS,
  DONE,
  OTHER
}

@Component({
  selector: 'parent-card',
  templateUrl: './parent-card.component.html'
})

export class ParentCardComponent implements OnInit {
  @Input() model: ParentCard;
  @Input() type: string;
  private path: string;
  private statusType = StatusType;
  private status: StatusType;

  ngOnInit(): void {
    if(this.model.type == 'project')
      this.path = 'project/' + this.model.key;
    else
      this.path = this.model.key;

    switch (this.model.status) {
      case "TO DO":
        this.status = StatusType.TO_DO;
        break;
      case "IN PROGRESS":
        this.status = StatusType.IN_PROGRESS;
        break;
      case "DONE":
        this.status = StatusType.DONE;
        break;
      default:
        this.status = StatusType.OTHER;
        break;
    }
  }
}
