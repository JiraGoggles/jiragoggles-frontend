import {Component, Input} from '@angular/core';
import {BreadcrumbItem} from "../breadcrumb";

@Component({
  selector: 'breadcrumb-item',
  templateUrl: './breadcrumb-item.component.html',
  styleUrls: [ './breadcrumb-item.component.scss' ]
})
export class BreadcrumbItemComponent {
  @Input() model: BreadcrumbItem;
}
