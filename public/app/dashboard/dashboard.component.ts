import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { User } from '../users/user';
import { UserService } from '../users/user.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: '/templates/dashboard.component.html',
  styleUrls: ['../css/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: User[] = [];

  constructor(
    private _router: Router,
    private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getUsers()
      .subscribe(
        users => this.users = users.slice(0,4),
        error =>  console.log(error)
    );
  }

  gotoDetail(user: User) {
    let link = ['UserDetail', { id: user.id }];
    this._router.navigate(link);
  }
}
