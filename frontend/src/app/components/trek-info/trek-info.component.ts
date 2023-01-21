import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { LocalService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-trek-info',
  templateUrl: './trek-info.component.html',
  styleUrls: ['./trek-info.component.scss'],
})
export class TrekInfoComponent implements OnInit {
  userData: any[] = [];

  constructor(
    private backendService: BackendService,
    private router: Router,
    private route: ActivatedRoute,
    private localStore: LocalService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.backendService.getTrekData(params['id']).subscribe({
        next: (data) => {
          this.userData = data;
          console.log(this.userData);
        },
        error: (error) => { },
      });
    });

  }
}
