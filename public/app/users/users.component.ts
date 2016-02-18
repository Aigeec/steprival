import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {OnInit} from 'angular2/core';
import {UserDetailComponent} from './user-detail.component';
import {User} from './user';
import {UserService} from './user.service';

@Component({
    selector: 'my-users',
    template:`
      <h2>My Users</h2>
      <ul class="users">
        <li *ngFor="#user of users" (click)="onSelect(user)" [class.selected]="user === selectedUser">
          <span class="badge">{{user.steps}}</span> {{user.displayName}}
        </li>
      </ul>
      <div *ngIf="selectedUser">
        <h2>
          {{selectedUser.displayName | uppercase}} is my hero
        </h2>
        <button (click)="gotoDetail()">View Details</button>
      </div>
    `,
    directives: [UserDetailComponent]
})

export class UsersComponent implements OnInit  {
  users: User[];
  errorMessage: string;
  selectedUser: User;

  constructor(
    private _router: Router,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers()
    .subscribe(
      users => this.users = users,
      error =>  this.errorMessage = <any>error
    );
  }

  onSelect(user: User) { this.selectedUser = user; }

  gotoDetail() {
    this._router.navigate(['UserDetail', { id: this.selectedUser.id }]);
  }

}
