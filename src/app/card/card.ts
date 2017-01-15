/**
 * Created by wiekonek on 10.11.16.
 */
interface Dictionary<T> {
  [ index: string ]: T
}

export enum StatusType {
  TO_DO,
  IN_PROGRESS,
  DONE,
  OTHER
}

export interface ParentCard extends Card {
  subCards?: ChildCard[];

  avatarUrls?: Dictionary<string>;
}

export interface  ChildCard extends Card {
}

export interface Card {
  key: string;
  type: string;
  priority: string;
  url: string; // TODO Api url isn't necessary. I'd like to have an url to JIRA page here.

  name: string;
  typeImgUrl: string;
  priorityImgUrl: string;

  status?: string; // 'TO DO' / 'IN PROGRESS' / 'DONE'
}
