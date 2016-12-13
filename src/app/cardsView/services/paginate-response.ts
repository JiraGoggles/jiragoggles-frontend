/**
 * Created by wiekonek on 13.12.16.
 */
import {Card} from "../../card/card";

export interface PaginateResponse<T extends Card> {
  count: number;
  cards: T[];
}
