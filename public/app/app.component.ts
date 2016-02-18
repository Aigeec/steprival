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
  selector: 'my-app',
  template:`
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Rivalries']">Rivalries</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    UserService,
    RivalryService
  ],
  styleUrls: ['../css/app.component.css']
})
export class AppComponent {
  title = 'Steprival';
}
