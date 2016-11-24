import {CardsService} from "./services/cards-service";
import {Card} from "../card/card";
import {ActivatedRoute} from "@angular/router";
/**
 * Created by wiekonek on 22.11.16.
 */

export class BaseKeyView {
  protected cards: Card[];
  protected key: number;


  constructor(protected route: ActivatedRoute, protected service: CardsService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['key'])
      .subscribe(key => {
        this.key = key;
        this.service
          .get(key)
          .subscribe(cards => this.cards = cards);
      });
  }
}
