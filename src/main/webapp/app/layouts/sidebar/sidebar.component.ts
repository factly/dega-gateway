import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'jhi-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['sidebar.scss']
})
export class SidebarComponent implements OnInit {
    @Output()
    change = new EventEmitter();
    toggleSticky;
    activeDropdown = 0;
    constructor() {}
    ngOnInit() {}
    stickMenu() {
        this.toggleSticky = !this.toggleSticky;
        this.change.emit();
    }

    toggleDropdown(i) {
        this.activeDropdown === i ? (this.activeDropdown = 0) : (this.activeDropdown = i);
    }
}
