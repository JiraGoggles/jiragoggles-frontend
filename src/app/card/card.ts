/**
 * Created by wiekonek on 10.11.16.
 */
interface Dictionary<T> {
  [ index: string ]: T
}

export interface ParentCard extends Card {
  subCards?: ChildCard[];

  status?: string; // 'TO DO' / 'IN PROGRESS' / 'DONE'
  avatarUrls?: Dictionary<string>;
}

export interface  ChildCard extends Card {

}

interface Card {
  key: string;
  type: string;
  url: string; // TODO Api url isn't necessary. I'd like to have an url to JIRA page here.

  name: string;
  typeImgUrl: string;
  priorityImgUrl: string;
}
