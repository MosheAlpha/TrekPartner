import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { LocalService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  userData: any[] = []
  isLoggedIn: boolean = false;

  constructor(private backendService: BackendService, private router: Router, private localStore: LocalService) { }

  ngOnInit(): void {
    this.backendService.getAllTreks().subscribe({
      next: data => {
        this.userData = data
        this.isLoggedIn = true;
      },
      error: error => {
        // this.router.navigateByUrl('/login');
        this.isLoggedIn = false;
      }
    });
  }

}
