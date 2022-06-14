import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  user: User | undefined;
  name:string = '';
  lastname:string = '';
  age:number = 0;
  birthDate:string = '';
  joke:string = '';
  isLoading = false;

  constructor(private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.isLoading = true;
    this.userService.getUsers()
    .subscribe(users => {this.users = users
      this.isLoading = false;});
  }

  add(): void {
    const user = {
      id: 0,
      name: this.name,
      lastname: this.lastname,
      age:this.age,
      birthDate: this.birthDate,
      joke: this.joke
    }
    this.isLoading = true;
    if (!user) { return; }
    this.userService.addUser(user)
      .subscribe(user => {
        this.users.push(user);
        this.isLoading = false;
        this.clear();
        this.goBack();
      });

    
  }

  delete(user: User): void {
    this.isLoading = true;
    this.users = this.users.filter(u => {
      u !== user
      this.isLoading = true;});
    this.userService.deleteUser(user.id).subscribe();
  }
  clear(): void{
    this.name = ''
    this.lastname = ''
    this.age = 0;
    this.birthDate = ''
  }
  goBack(): void {
    this.location.back();
  }
  getJoke():void {
    this.isLoading = true;
     this.userService.getJoke()
        .subscribe(j => {this.joke = j.joke
          this.isLoading = false;
        });
  }
}
