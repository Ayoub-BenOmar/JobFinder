import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    private authService = inject(AuthService);
    private fb = inject(FormBuilder);
    private router = inject(Router);

    profileForm: FormGroup;
    successMessage = '';
    errorMessage = '';

    constructor() {
        this.profileForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]] // Allow password update
        });
    }

    ngOnInit() {
        const user = this.authService.currentUser();
        if (user) {
            this.profileForm.patchValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password // Ideally don't show, but requirement "Modifier ... mot de passe"
            });
        }
    }

    onSubmit() {
        if (this.profileForm.invalid) return;

        const currentUser = this.authService.currentUser();
        if (!currentUser) return;

        const updatedUser = {
            ...currentUser,
            ...this.profileForm.value
        };

        this.authService.updateUser(updatedUser).subscribe({
            next: (user) => {
                this.successMessage = 'Profile updated successfully';
                this.errorMessage = '';
                // Signal/State update handled by service ideally, or we force reload
                // If AuthService uses signal, it might need to be updated manually if it doesn't listen to this specific call.
                // Assuming AuthService might need a refresh logic or we just re-login conceptually? 
                // For now, simple alert.
            },
            error: (err) => {
                this.errorMessage = 'Failed to update profile';
                this.successMessage = '';
                console.error(err);
            }
        });
    }

    deleteAccount() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            const user = this.authService.currentUser();
            if (user) {
                this.authService.deleteUser(user.id).subscribe({
                    next: () => {
                        this.router.navigate(['/login']);
                    },
                    error: (err) => alert('Failed to delete account')
                });
            }
        }
    }
}
