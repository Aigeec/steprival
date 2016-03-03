import {RIVALRIES} from './mock-rivalries';
import {Injectable} from 'angular2/core';

@Injectable()
export class RivalryService {
  getRivalries() {
    return Promise.resolve(RIVALRIES);
  }
  getRivalry(id:number){
    return Promise.resolve(RIVALRIES).then(
      rivalries => rivalries.filter(rivalry => rivalry.id == id)[0]
    );
  }
}
