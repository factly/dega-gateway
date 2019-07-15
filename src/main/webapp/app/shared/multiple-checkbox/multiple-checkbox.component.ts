import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';

@Component({
    selector: 'jhi-multiple-checkbox',
    templateUrl: 'multiple-checkbox.component.html'
})
export class MultipleCheckboxComponent implements OnChanges {
    @Input()
    option_list: any[];
    @Input()
    selected_options: any[];
    @Output()
    updated_selection: EventEmitter<any> = new EventEmitter();

    labelPosition = 'after';

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        const selectedIds = this.selected_options.map(obj => obj.id);
        this.option_list = this.option_list.filter(obj => !selectedIds.includes(obj.id));
    }

    checkbox_change_operation(e) {
        if (e.checked) {
            const new_selected_data = {};
            new_selected_data['id'] = e.source.value;
            new_selected_data['display_text'] = this.option_list.filter(obj => obj['id'] === e.source.value)[0]['display_text'];
            this.selected_options.push(new_selected_data);
            this.updated_selection.emit(this.selected_options);
            this.option_list = this.option_list.filter(obj => obj.id !== e.source.value);
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

    removeSelected(id, display_text) {
        this.selected_options = this.selected_options.filter(obj => obj['id'] !== id);
        this.updated_selection.emit(this.selected_options);
        const removedObj = {};
        removedObj['id'] = id;
        removedObj['display_text'] = display_text;
        this.option_list = [removedObj, ...this.option_list];
    }
}
