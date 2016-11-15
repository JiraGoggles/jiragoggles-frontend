/**
 * Created by wiekonek on 09.11.16.
 */
import {Component, Input} from '@angular/core';
import {Card} from "./card";

@Component({
  selector: 'card',
  templateUrl: './card.component.html'
})

export class CardComponent {
  @Input() model:Card;
}

