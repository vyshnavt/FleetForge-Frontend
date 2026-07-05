// login.component.ts
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AuthStateService } from '../../../core/services/auth-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  private platformId = inject(PLATFORM_ID);
  

  constructor(private fb: FormBuilder, private router: Router,private route :ActivatedRoute,
    private authService: AuthService, private authSate:AuthStateService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      console.log('Authenticating Payload:', this.loginForm.value);
      
      this.authService.doLogin({...this.loginForm.value,tenantId: 'cb188153-5479-476b-82f8-41efbaf7eaba'}).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.authSate.setToken(response.accessToken);
          this.isLoading = false;
          this.router.navigate(['/bills']);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/bills';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) =>{
          console.log('Login failed:', error); 
          this.isLoading = false;
        }
      })
      // setTimeout(() => {
      //   this.isLoading = false;
      //   this.router.navigate(['/bills']);
      // }, 1500);

      // if (isPlatformBrowser(this.platformId)) {
      //     localStorage.setItem('token', 'response.token');
      //   }

      

      // 3. Navigate the user
      

    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
