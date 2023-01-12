import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treks',
  templateUrl: './treks.component.html',
  styleUrls: ['./treks.component.scss']
})
export class TreksComponent implements OnInit {
  arrLength: number[] = [];
  constructor() { }

  ngOnInit(): void {
    for (let index = 1; index < 20; index++) {
      this.arrLength.push(index)
    }
  }

}
