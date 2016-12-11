/**
 * Created by wiekonek on 11.12.16.
 */
import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card";

@Component({
  selector: 'child-card',
  templateUrl: './child-card.component.html'
})

export class ChildCardComponent implements  OnInit {
  @Input() model: Card;
  @Input() type: string;
  private jiraUrl: string = "";

  ngOnInit(): void {
    this.jiraUrl = 'https://' + this.model.url.split('/')[2] + '/browse/' + this.model.key;
  }
}
