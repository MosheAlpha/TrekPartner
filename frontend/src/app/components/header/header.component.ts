import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { LocalService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private backendService: BackendService,
    private router: Router,
    private localStore: LocalService
  ) {}

  ngOnInit(): void {
    this.checkifLogged()
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
