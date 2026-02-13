import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-job-search',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './job-search.component.html',
    styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent {
    @Output() search = new EventEmitter<{ keyword: string, location: string }>();

    keyword = '';
    location = '';

    onSearch() {
        this.search.emit({ keyword: this.keyword, location: this.location });
    }
}
