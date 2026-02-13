import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [CommonModule, LoginComponent, RegisterComponent],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    private route = inject(ActivatedRoute);

    isRegister = false;

    ngOnInit() {
        // Check URL to set initial state
        this.route.url.subscribe(segments => {
            const path = segments[0]?.path;
            this.isRegister = path === 'register';
        });
    }

    toggleMode() {
        this.isRegister = !this.isRegister;
    }
}
