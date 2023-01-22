import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  subscribeForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  subscribe(){
    if(this.subscribeForm.get('email')?.valid){
      window.alert("Email was sent succesfully!")
      this.subscribeForm.get('email')?.setValue('')
    }else{
      window.alert("Check your email again!")
    }
  }

}
