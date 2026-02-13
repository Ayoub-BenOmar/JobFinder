import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    registerForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    errorMessage = '';
    isLoading = false;

    onSubmit() {
        if (this.registerForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';
            const { firstName, lastName, email, password } = this.registerForm.value;

            this.authService.register({
                firstName: firstName!,
                lastName: lastName!,
                email: email!,
                password: password!
            }).subscribe({
                next: () => {
                    this.isLoading = false;
                    // Successfully registered. Maybe log them in automatically or redirect to login
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    this.isLoading = false;
                    this.errorMessage = err.message || 'Registration failed.';
                }
            });
        }
    }
}
