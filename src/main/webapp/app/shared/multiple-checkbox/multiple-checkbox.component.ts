import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'jhi-multiple-checkbox',
    templateUrl: 'multiple-checkbox.component.html'
})
export class MultipleCheckboxComponent {
    @Input()
    option_list: any[];
    @Input()
    selected_options: any[];
    @Output()
    updated_selection: EventEmitter<any> = new EventEmitter();

    labelPosition = 'after';

    constructor() {}

    checkbox_change_operation(e) {
        if (e.checked) {
            const new_selected_data = {};
            new_selected_data['id'] = e.source.value;
            this.selected_options.push(new_selected_data);
            this.updated_selection.emit(this.selected_options);
        } else {
            this.selected_options = this.selected_options.filter(obj => obj['id'] !== e.source.value);
            this.updated_selection.emit(this.selected_options);
        }
    }

    is_selected(id) {
        for (const option_detail of this.selected_options) {
            if (id === option_detail['id']) {
                return true;
            }
        }
        return false;
    }
}
