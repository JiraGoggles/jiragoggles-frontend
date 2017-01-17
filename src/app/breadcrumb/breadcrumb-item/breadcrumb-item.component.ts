import {Component, Input} from '@angular/core';
import {BreadcrumbItem} from "../breadcrumb";

@Component({
  selector: 'breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: [ './breadcrumb-item.component.scss' ]
})
export class BreadcrumbItemComponent {
  maxLength: number = 15;
  @Input() model: BreadcrumbItem;

  shortName(): string {
    let name = this.model.name;
    if(name  != null)
      return name.length > this.maxLength ? name.substring(0, this.maxLength) + "..." : name;
    else
      return '';
  }
}
