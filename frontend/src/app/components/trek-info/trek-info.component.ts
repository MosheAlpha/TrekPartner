import { Component, OnInit } from '@angular/core';
import { MatCardLgImage } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { BackendService } from 'src/app/backend.service';
import { LocalService } from 'src/app/local-storage.service';
import { MyComment } from 'src/app/trek';

@Component({
  selector: 'app-trek-info',
  templateUrl: './trek-info.component.html',
  styleUrls: ['./trek-info.component.scss'],
})
export class TrekInfoComponent implements OnInit {
  userData: any[] = [];
  comments: any[] = [];
  newComment: string = '';
  newCommentTitle: string = '';
  


  constructor(
    private backendService: BackendService,
    private router: Router,
    private route: ActivatedRoute,
    private localStore: LocalService
  ) {}

  ngOnInit(): void {
    let commentsOnTrek;
    this.route.params.subscribe((params) => {
      this.backendService.getTrekData(params['id']).subscribe({
        next: (data) => {
          this.userData.push(data);
          commentsOnTrek = this.userData[0]['comments'];
          for (let i = 0; i < commentsOnTrek.length; i++) {
            if (commentsOnTrek[i]['user'].length == 0) {
              commentsOnTrek[i]['user'] = 'null';
              continue;
            }
            this.getUsernameFromPK(commentsOnTrek[i]['user'][0], i, commentsOnTrek);
          }
          for (let i = 0; i < commentsOnTrek.length; i++) {
            const element = commentsOnTrek[i];
            this.comments.push(element)
          }
          
        },
        error: (error) => { },
      });
    });
    console.log(this.comments);
    
  }

  getUsernameFromPK(id: number, index: number, commentsOnTrek: any) {
    this.backendService.getUsernameFromPK(id).pipe(first()).subscribe(
        data => {
            commentsOnTrek[index]['user'] = data['username']
        },
        error => {
            console.log(error);
            commentsOnTrek[index]['user'][0] = 'null';
        }
    );
}

  addComment(){
    console.log(this.newComment);
    if (this.newCommentTitle === ''){
      window.alert("You cannot post an empty comment title.")
      return;
    }
    if (this.newComment === '') {
      window.alert("You cannot post an empty comment.")
      return;
    }
    let tempComment: MyComment = new MyComment(this.newCommentTitle, this.newComment);
    console.log(tempComment);
    this.backendService.addComment(tempComment, this.userData[0]['pk']).subscribe({
      next: (data) =>{
        console.log(data);
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
  clearTitleAndComment(){
    this.newComment = '';
    this.newCommentTitle = '';
  }
}
