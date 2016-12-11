/**
 * Created by wiekonek on 11.12.16.
 */
import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../card";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'parent-card',
  templateUrl: './parent-card.component.html'
})

export class ParentCardComponent implements OnInit {
  @Input() model: Card;
  @Input() type: string;
  private path: string;

  ngOnInit(): void {
    if(this.model.type == 'project')
      this.path = 'project/' + this.model.key;
    else
      this.path = this.model.key;
  }
}
