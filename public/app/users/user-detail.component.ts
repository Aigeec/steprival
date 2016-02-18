import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {UserService} from './user.service';
import {User} from './user';

@Component({
  selector: 'my-user-detail',
  inputs: ['user'],
  templateUrl: '/templates/user-detail.component.html',
  styleUrls: ['../css/user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private _userService: UserService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._userService.getUser(id)
      .then(user => this.user = user);
  }

  goBack() {
    window.history.back();
  }
}
