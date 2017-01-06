/**
 * Created by wiekonek on 11.12.16.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ParentCard} from "../card";
import {ChildCardComponent} from "../child-card/child-card.component";

enum StatusType {
  TO_DO,
  IN_PROGRESS,
  DONE,
  OTHER
}

@Component({
  selector: 'parent-card',
  templateUrl: './parent-card.component.html',
  styleUrls: [ '../card.component.scss' ]
})

export class ParentCardComponent extends ChildCardComponent implements OnInit {
  @Input() model: ParentCard;
  @Input() type: string;
  private parentPath: string;
  private statusType = StatusType;
  private status: StatusType;
  private isOfProjectType: boolean; // for convenience sake (in templateUrl file)

  ngOnInit(): void {
    super.init();
    if(this.model.type.toLowerCase() == 'project')
      this.parentPath = 'project/' + this.model.key;
    else {
      this.parentPath = this.model.key;
      if (this.model.status != null) {
        switch (this.model.status.toUpperCase()) {
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
      else {
        this.status = StatusType.OTHER;
      }
    }
    this.isOfProjectType = this.model.type.toLowerCase() === 'project';
  }
}
