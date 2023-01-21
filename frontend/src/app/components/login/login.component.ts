import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { LocalService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });
  access_token = "";
  isLoggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private backendService: BackendService, private router: Router, private localStore: LocalService) { }

  ngOnInit(): void { }

  login(): void {
    this.backendService.login(String(this.loginForm.value.username), String(this.loginForm.value.password)).subscribe({
      next: data => {
        this.localStore.clearData()
        this.localStore.saveData('access_token', data.access)
        this.localStore.saveData('refresh_token', data.refresh)
        this.router.navigateByUrl('/main');
      },
      error: error => {}
    });
  }
}
