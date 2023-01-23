import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/backend.service';
import { LocalService } from 'src/app/local-storage.service';
import { Trek } from 'src/app/trek';

@Component({
  selector: 'app-add-trek',
  templateUrl: './add-trek.component.html',
  styleUrls: ['./add-trek.component.scss'],
})
export class AddTrekComponent implements OnInit {
  newTrekForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    location: ['', [Validators.required]],
    length: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private router: Router,
    private localStore: LocalService
  ) {}

  ngOnInit(): void {}

  addTrek(): void {
    let formData = <Trek>this.newTrekForm.value;
    if (this.newTrekForm?.valid) {
      this.backendService.addTrek(formData).subscribe({
        next: (data) => {
          window.alert('new trek was created successfully!!!');
        },
        error: (error) => {
          window.alert('Try again with correct data at all fields!');
        },
      });
    } else {
      window.alert('Not all fields are full!');
    }
  }
}
