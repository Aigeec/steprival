import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {RivalryService} from './rivalry.service';
import {Rivalry} from './rivalry';

@Component({
  selector: 'my-rivalry-detail',
  inputs: ['rivalry'],
  templateUrl: '/templates/rivalry-detail.component.html',
  styleUrls: ['../css/user-detail.component.css']
})
export class RivalryDetailComponent implements OnInit {
  rivalry: Rivalry;

  constructor(
    private _rivalryService: RivalryService,
    private _routeParams: RouteParams) {
  }

  ngOnInit() {
    let id = +this._routeParams.get('id');
    this._rivalryService.getRivalry(id)
      .then(rivalry => this.rivalry = rivalry);
  }

  goBack() {
    window.history.back();
  }
}
