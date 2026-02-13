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
            password: ['', [Validators.minLength(6)]] // Password not required for update
        });
    }

    ngOnInit() {
        const user = this.authService.currentUser();
        if (user) {
            this.profileForm.patchValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: '' // Explicitly empty
            });
        }
    }

    onSubmit() {
        if (this.profileForm.invalid) return;

        const currentUser = this.authService.currentUser();
        if (!currentUser || !currentUser.id) return;

        // Create update payload
        const updates: any = {
            id: currentUser.id,
            firstName: this.profileForm.value.firstName,
            lastName: this.profileForm.value.lastName,
            email: this.profileForm.value.email
        };

        // Only include password if user entered a new one
        const newPassword = this.profileForm.value.password;
        if (newPassword && newPassword.trim().length > 0) {
            updates.password = newPassword;
        }

        this.authService.updateUser(updates).subscribe({
            next: (user) => {
                this.successMessage = 'Profile updated successfully';
                this.errorMessage = '';
                this.profileForm.patchValue({ password: '' }); // Reset password field
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
