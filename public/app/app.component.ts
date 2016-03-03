import {Component} from 'angular2/core';
import {UsersComponent} from './users/users.component';
import {RivalriesComponent} from './rivalries/rivalries.component';
import {RivalryDetailComponent} from './rivalries/rivalry-detail.component';
import {UserDetailComponent} from './users/user-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserService} from './users/user.service';
import {RivalryService} from './rivalries/rivalry.service';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS}    from 'angular2/http';


@RouteConfig([
  {
    path: '/detail/:id',
    name: 'UserDetail',
    component: UserDetailComponent
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/rivalries',
    name: 'Rivalries',
    component: RivalriesComponent
  },
  {
    path: '/rivalries/:id',
    name: 'RivalryDetail',
    component: RivalryDetailComponent
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersComponent
  }
])

@Component({
  selector: 'sr-app',
  templateUrl:'/templates/app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    UserService,
    RivalryService
  ],
  styles: [`
    .navbar-default .navbar-nav > li > a.router-link-active {
      color: #555;
      background-color: #e7e7e7;
    }
  `]
})
export class AppComponent {
  title = 'Steprival';
}
