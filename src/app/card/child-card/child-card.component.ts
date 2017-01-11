/**
 * Created by wiekonek on 11.12.16.
 */
import {
  Component, Input, OnInit
} from '@angular/core';
import {ChildCard, ParentCard} from "../card";

@Component({
  selector: 'child-card',
  templateUrl: './child-card.component.html',
  styleUrls: [ '../card.component.scss', './child-card.component.scss' ]
})

export class ChildCardComponent implements  OnInit {
  @Input() model: ChildCard;
  @Input() parentModel: ParentCard;
  @Input() type: string;

  protected jiraUrl: string = null;
  protected childPath: string;

  ngOnInit(): void {
    let path = this.parentModel.key + '/' +this.model.key;
    if(this.model.type.toLowerCase() == 'epic')
      this.childPath = 'project/' + path;
    else
      this.childPath = path;

    this.init();
  }

  init(): void {
    //TODO Is there any other way to get the jira base url?
    if (this.model.url != null)
      this.jiraUrl = 'https://' + this.model.url.split('/')[2] + '/browse/' + this.model.key;
  }
}
