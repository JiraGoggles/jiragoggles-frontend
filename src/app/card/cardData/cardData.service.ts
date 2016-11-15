/**
 * Created by wiekonek on 09.11.16.
 */
import {Injectable} from "@angular/core";


export class CardData {
  title:string;

  constructor() {
    this.title = "Nice title from CardData service.";
  }

  getTitle() {
    return this.title;
  }
}
