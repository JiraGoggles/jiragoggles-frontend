/**
 * Created by wiekonek on 10.11.16.
 */
interface Dictionary {
  [ index: string ]: string
}


export interface Card {
  key: string;
  name: string;
  type: string;
  description: string;
  url: string;
  avatarUrls: Dictionary;
  subCards: Card[]
}
