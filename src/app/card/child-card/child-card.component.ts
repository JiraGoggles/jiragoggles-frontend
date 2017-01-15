/**
 * Created by wiekonek on 11.12.16.
 */
import {
  Component, Input, OnInit
} from '@angular/core';
import {ChildCard, ParentCard, StatusType} from "../card";

@Component({
  selector: 'child-card',
  templateUrl: './child-card.component.html',
  styleUrls: [ '../card.component.scss', './child-card.component.scss' ]
})

export class ChildCardComponent implements  OnInit {
  @Input() model: ChildCard;
  @Input() parentModel: ParentCard;
  @Input() type: string;

  protected statusType = StatusType;
  protected status: StatusType;
  protected jiraUrl: string = null;
  protected childPath: string;

  ngOnInit(): void {
    let path = this.parentModel.key + '/' +this.model.key;
    if(this.model.type.toLowerCase() == 'epic')
      this.childPath = 'project/' + path;
    else
      this.childPath = path;

    this.init();

    // TODO get rid of this workaround eventually
    const lengthBeforeTruncation = this.model.name.length;
    this.model.name = this.model.name.substring(0, 40);
    if (lengthBeforeTruncation > 40)
      this.model.name += '...';
  }

  init(): void {
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
    //TODO Is there any other way to get the jira base url?
    if (this.model.url != null)
      this.jiraUrl = 'https://' + this.model.url.split('/')[2] + '/browse/' + this.model.key;
  }
}
