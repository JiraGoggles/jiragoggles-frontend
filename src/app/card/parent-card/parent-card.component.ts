/**
 * Created by wiekonek on 11.12.16.
 */
import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {ParentCard} from "../card";
import {ChildCardComponent} from "../child-card/child-card.component";

@Component({
  selector: 'parent-card',
  templateUrl: './parent-card.component.html',
  styleUrls: [ '../card.component.scss', './parent-card.component.scss' ]
})

export class ParentCardComponent extends ChildCardComponent implements OnInit {
  @Input() model: ParentCard;
  @Input() type: string;
  @Output() onRankChangeRequest = new EventEmitter<string[]>();
  private parentPath: string;
  private path: string;
  private isOfProjectType: boolean; // for convenience sake (in templateUrl file)

  public onRankClick(id: string, direction: string){
    let args: string[] = [id, direction];
    this.onRankChangeRequest.emit(args);
  }

  ngOnInit(): void {
    super.init();
    this.isOfProjectType = this.model.type.toLowerCase() === 'project';
    if(this.isOfProjectType)
      this.parentPath = 'project/' + this.model.key;
    else {
      this.parentPath = this.model.key;
    }
  }
}
