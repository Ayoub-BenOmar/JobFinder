import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService, Application, ApplicationStatus } from '../../core/services/application.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-applications',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
    private applicationService = inject(ApplicationService);
    private authService = inject(AuthService);
    private cdr = inject(ChangeDetectorRef);

    applications: Application[] = [];
    isLoading = false;

    ngOnInit() {
        this.loadApplications();
    }

    loadApplications() {
        const user = this.authService.currentUser();
        if (user) {
            this.isLoading = true;
            this.cdr.detectChanges(); // Force update

            this.applicationService.getApplications(user.id).subscribe({
                next: (data) => {
                    this.applications = data;
                    this.isLoading = false;
                    this.cdr.detectChanges(); // Force update on data
                },
                error: (err) => {
                    console.error(err);
                    this.isLoading = false;
                    this.cdr.detectChanges(); // Force update on error
                }
            });
        }
    }

    updateStatus(app: Application, newStatus: ApplicationStatus) {
        if (app.status === newStatus) return;

        const updatedApp = { ...app, status: newStatus };
        this.applicationService.updateApplication(updatedApp).subscribe({
            next: () => {
                app.status = newStatus; // Optimistic update or reload?
            },
            error: (err) => console.error(err)
        });
    }

    updateNotes(app: Application) {
        this.applicationService.updateApplication(app).subscribe({
            next: () => alert('Notes updated'),
            error: (err) => console.error(err)
        });
    }

    removeApplication(id: string) {
        if (confirm('Are you sure you want to stop tracking this application?')) {
            this.applicationService.deleteApplication(id).subscribe({
                next: () => {
                    this.applications = this.applications.filter(a => a.id !== id);
                },
                error: (err) => console.error(err)
            });
        }
    }
}
