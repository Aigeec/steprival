import {USERS} from './mock-users';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {User} from './user';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class UserService {
  constructor (private http: Http) {}
  private _usersUrl = '/api/user';
  getUsers() {
    return this.http.get(this._usersUrl)
      .do(res => console.log('Response:', res))
      .map(res => <User[]> res.json())
      .catch(this.handleError);
  }
  getUser(id: number) {
    return Promise.resolve(USERS).then(
      function(users){
        console.log(users);
        return users.filter(user => user.id === id)[0]
      }
    );
  }
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
