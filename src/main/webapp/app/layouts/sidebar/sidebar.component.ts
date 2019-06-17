import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VERSION } from 'app/app.constants';

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
    version: string;
    constructor() {
        this.version = VERSION ? 'v' + VERSION : '';
    }
    ngOnInit() {}
    stickMenu() {
        this.toggleSticky = !this.toggleSticky;
        this.change.emit();
    }

    toggleDropdown(i) {
        this.activeDropdown === i ? (this.activeDropdown = 0) : (this.activeDropdown = i);
    }
}
