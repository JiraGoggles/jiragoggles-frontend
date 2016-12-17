/**
 * Created by wiekonek on 11.12.16.
 */
import {Component, Input, OnInit} from '@angular/core';
import {ChildCard} from "../card";

@Component({
  selector: 'child-card',
  templateUrl: './child-card.component.html'
})

export class ChildCardComponent implements  OnInit {
  @Input() model: ChildCard;
  @Input() type: string;
  protected jiraUrl: string = "";

  ngOnInit(): void {

    //TODO Is there any other way to get the jira base url?
    if(this.model.url != null)
      this.jiraUrl = 'https://' + this.model.url.split('/')[2] + '/browse/' + this.model.key;
    else
      this.jiraUrl = '';
  }
}
