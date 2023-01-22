import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { LocalService } from 'src/app/local-storage.service';
import { Trek } from 'src/app/trek';

@Component({
  selector: 'app-add-trek',
  templateUrl: './add-trek.component.html',
  styleUrls: ['./add-trek.component.scss']
})
export class AddTrekComponent implements OnInit {
  trekForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category: [0, [Validators.required]],
    location: ['', [Validators.required]],
    length: ['', [Validators.required]],
    image: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private backendService: BackendService, private router: Router, private localStore: LocalService) { }

  ngOnInit(): void { }

  add(): void {
    let formData = <Trek>this.trekForm.value;

    // this.backendService.register(formData).subscribe({
    //   next: data => {
    //     this.backendService.login(String(formData.username), String(formData.password)).subscribe({
    //       next: data => {
    //         this.localStore.clearData()
    //         this.localStore.saveData('access_token', data.access)
    //         this.localStore.saveData('refresh_token', data.refresh)
    //         this.router.navigateByUrl('/main');
    //       },
    //       error: error1 => { }
    //     })
    //   },
    //   error: error => {
    //     window.alert("Try again with correct data at all fields!")
    //   }
    // })
  }
}