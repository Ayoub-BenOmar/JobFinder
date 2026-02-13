import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../core/services/job.service';
import { JobSearchComponent } from './search/job-search.component';
import { JobListComponent } from './list/job-list.component';
import { Job } from '../../core/models/job.model';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-jobs',
    standalone: true,
    imports: [CommonModule, JobSearchComponent, JobListComponent],
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
    private jobService = inject(JobService);
    private cdr = inject(ChangeDetectorRef);

    jobs: Job[] = [];
    isLoading = false;
    meta: any = {};
    currentCriteria = { keyword: '', location: '' };

    ngOnInit() {
        this.fetchJobs(1);
    }

    onSearch(criteria: { keyword: string, location: string }) {
        this.currentCriteria = criteria;
        this.fetchJobs(1);
    }

    fetchJobs(page: number) {
        this.isLoading = true;
        // Force spinner to show
        this.cdr.detectChanges();

        this.jobService.searchJobs(this.currentCriteria.keyword, this.currentCriteria.location, page)
            .pipe(finalize(() => {
                this.isLoading = false;
                this.cdr.detectChanges(); // Force update when complete
            }))
            .subscribe({
                next: (data) => {
                    this.jobs = data.jobs;
                    this.meta = data.meta;
                    this.cdr.detectChanges(); // Force update when data arrives
                },
                error: (err) => {
                    console.error('Error fetching jobs', err);
                }
            });
    }

    onPageChange(page: number) {
        this.fetchJobs(page);
    }
}
