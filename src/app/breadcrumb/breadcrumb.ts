export interface BreadcrumbItem {
  url: string;
  key: string;
  isActive: boolean;
}

export interface ProjectBreadcrumbItem extends BreadcrumbItem {
  name: string;
}

export interface IssueBreadcrumbItem extends BreadcrumbItem {
  name: string; //TODO check if it's the same as 'summary'
  priorityImgUrl: string;
}
