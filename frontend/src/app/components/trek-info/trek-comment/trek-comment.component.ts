import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-trek-comment',
  templateUrl: './trek-comment.component.html',
  styleUrls: ['./trek-comment.component.scss']
})
export class TrekCommentComponent implements OnInit {

  @Input() title: string = 'Temp Title';
  @Input() username: string = 'Temp Username';
  @Input() date: string = 'temp date';
  @Input() content: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  constructor() { }

  ngOnInit(): void {
  }

}
