/**
 * Created by wiekonek on 11.12.16.
 */
import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
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
  styleUrls: [ '../card.component.scss', './parent-card.component.scss' ]
})

export class ParentCardComponent extends ChildCardComponent implements OnInit {
  @Input() model: ParentCard;
  @Input() type: string;
  @Output() onRankChangeRequest = new EventEmitter<string[]>();
  private parentPath: string;
  private path: string;
  private statusType = StatusType;
  private status: StatusType;
  private isOfProjectType: boolean; // for convenience sake (in templateUrl file)

  public onRankClick(id: string, direction: string){
    let args: string[] = [id, direction];
    this.onRankChangeRequest.emit(args);
  }

  ngOnInit(): void {
    super.init();
    this.isOfProjectType = this.model.type.toLowerCase() === 'project';
    if(this.isOfProjectType)
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

    // TODO get rid of this workaround eventually
    const lengthBeforeTruncation = this.model.name.length;
    this.model.name = this.model.name.substring(0, 40);
    if (lengthBeforeTruncation > 40)
      this.model.name += '...';
  }
}
