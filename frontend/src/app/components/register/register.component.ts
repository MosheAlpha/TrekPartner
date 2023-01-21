import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { LocalService } from 'src/app/local-storage.service';
import { registerForm } from 'src/app/trek';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password2: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]]
  });
  isLoggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private backendService: BackendService, private router: Router, private localStore: LocalService) { }

  ngOnInit(): void { }

  register(): void {
    let formData = <registerForm>this.registerForm.value
    this.backendService.register(formData).subscribe({
      next: data => {
        this.backendService.login(String(formData.username), String(formData.password)).subscribe({
          next: data => {
            this.localStore.clearData()
            this.localStore.saveData('access_token', data.access)
            this.localStore.saveData('refresh_token', data.refresh)
            this.router.navigateByUrl('/main');
          },
          error: error1 => { }
        })
      },
      error: error => { }
    })
  }
}

