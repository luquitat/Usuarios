import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent  implements OnInit {
  user: User = {
    id:0,
    name: '',
    lastname: '',
    birthDate: '',
    age: 0,
    joke: ''
  };
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.isLoading = true
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.userService.getUser(id)
      .subscribe(user => {this.user = user
        this.isLoading = false});
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.user) {
      this.isLoading = true
      this.userService.updateUser(this.user)
        .subscribe(() => {this.goBack()
          this.isLoading = false});
    }
  }

  getJoke():void {
    this.isLoading = true
     this.userService.getJoke()
        .subscribe(j => {this.user.joke = j.joke
          this.isLoading = false});
  }

}
