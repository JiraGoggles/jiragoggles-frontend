export interface BreadcrumbItem {
  url: string;
  key: string;
  name?: string;
  isActive: boolean;
}

export interface ProjectBreadcrumbItem extends BreadcrumbItem {
}

export interface IssueBreadcrumbItem extends BreadcrumbItem {
  priorityImgUrl: string;
}
