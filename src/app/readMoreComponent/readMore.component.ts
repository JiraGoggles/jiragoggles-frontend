import { Component } from '@angular/core';

@Component({
    selector: 'read-more',
    template: `
        <div [class.collapsed]="isCollapsed">
            <ng-content></ng-content>
            <a href="#" (click)="isCollapsed =! isCollapsed">Read more</a>
        </div>
    `,
    styles: [`
        div.collapsed {
            height: 250px;
        }
    `]
})

export class ReadMoreComponent {
    isCollapsed: boolean = true;
}