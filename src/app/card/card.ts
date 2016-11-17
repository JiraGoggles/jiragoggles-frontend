/**
 * Created by wiekonek on 10.11.16.
 */
interface Dictionary {
  [ index: string ]: string
}


export class Card {
  key: string;
  name: string;
  description: string;
  url: string;
  avatarUrls: Dictionary;
  subCards: Card[]
}
