import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { LocalService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  userData: any[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private backendService: BackendService,
    private router: Router,
    private localStore: LocalService
  ) {}

  ngOnInit(): void {
    this.checkifLogged()
    this.backendService.getAllTreks().subscribe({
      next: (data) => {
        this.userData = data;
        console.log(data)
        this.isLoggedIn = true;
      },
      error: (error) => {
        // this.router.navigateByUrl('/login');
        this.isLoggedIn = false;
      },
    });
  }

  checkifLogged(){
    if (this.localStore.getData('access_token')){
      this.isLoggedIn = true;
    }
  }

  logout() {
    if (this.localStore.getData('access_token')){
      this.backendService.logout().subscribe({
        next: (data) => {
        },
        error: (error) => {},
      });
    }
    this.localStore.clearData();
          this.router.navigateByUrl('/login');
  }
  
}
