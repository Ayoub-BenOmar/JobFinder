import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    errorMessage = '';
    isLoading = false;

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';
            const { email, password } = this.loginForm.value;

            this.authService.login({ email: email!, password: password! }).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.router.navigate(['/']); // Navigate to home/dashboard
                },
                error: (err) => {
                    this.isLoading = false;
                    this.errorMessage = err.message || 'Login failed. Please check your credentials.';
                }
            });
        }
    }
}
