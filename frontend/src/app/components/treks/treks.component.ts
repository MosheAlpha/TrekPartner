import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { LocalService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-treks',
  templateUrl: './treks.component.html',
  styleUrls: ['./treks.component.scss']
})
export class TreksComponent implements OnInit {
  userData: any[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private backendService: BackendService,
    private router: Router,
    private localStore: LocalService
  ) {}

  ngOnInit(): void {
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
}