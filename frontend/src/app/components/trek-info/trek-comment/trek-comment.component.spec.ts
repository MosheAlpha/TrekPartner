import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrekCommentComponent } from './trek-comment.component';

describe('TrekCommentComponent', () => {
  let component: TrekCommentComponent;
  let fixture: ComponentFixture<TrekCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrekCommentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrekCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
