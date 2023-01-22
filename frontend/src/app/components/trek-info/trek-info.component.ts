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
  participants: any[] = [];
  newComment: string = '';
  newCommentTitle: string = '';
  isParticipant: boolean = false;
  participantsPK: number[] = [];


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
          console.log(data)
          this.userData.push(data);
          for (let i = 0; i < this.userData[0]['participants'].length; i++) {
            const userID = this.userData[0]['participants'][i];
            let jwtToken: string | null = localStorage.getItem('access_token');
            let userPK = this.decodeJWT(jwtToken)
            if (userPK === userID){
              this.isParticipant = true;
            }
            this.participantsPK.push(userID);
            this.backendService.getUsernameFromPK(userID).pipe(first()).subscribe(
              data => {
                this.participants.push(data['username']);
              }
            )
          }
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
        window.location.reload();
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
  clearTitleAndComment(){
    this.newComment = '';
    this.newCommentTitle = '';
    console.log(this.participantsPK);
    console.log(this.isParticipant);
  }
  joinTrek(){
    let jwtToken: string | null = localStorage.getItem('access_token');
    let userPK = this.decodeJWT(jwtToken)
    this.backendService.joinToTrek(this.userData[0]['pk'], userPK).subscribe({
      next: (data) => {
        console.log(data);
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  abortTrek(){
    console.log("TODO");
    let jwtToken: string | null = localStorage.getItem('access_token');
    let userPK = this.decodeJWT(jwtToken)
    this.backendService.abortTrek(this.userData[0]['pk'], userPK).subscribe({
      next: (data) => {
        console.log(data);
        window.location.reload();
      },
      error: (error) => {
        console.log(error)
      }
    })
    
  }

  decodeJWT(token: string | null): number {
    if (token == null){
      return -1;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_id;
    } catch (err) {
      console.error(err);
      return -1;
    }
  }
  
}
