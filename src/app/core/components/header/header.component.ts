import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    authService = inject(AuthService);
    private router = inject(Router);
    currentUser = this.authService.currentUser;

    get isAuthPage(): boolean {
        return this.router.url === '/login' || this.router.url === '/register';
    }

    logout() {
        this.authService.logout();
    }
}
