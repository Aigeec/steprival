import {Component} from 'angular2/core';
import {Router} from 'angular2/router';
import {OnInit} from 'angular2/core';
import {Rivalry} from './rivalry';
import {RivalryService} from './rivalry.service';

@Component({
    selector: 'my-rivalries',
    template:`
      <h2>My Rivalries</h2>
      <ul class="rivalries">
        <li *ngFor="#rivalry of rivalries" (click)="onSelect(rivalry)" [class.selected]="rivalry === selectedRivalry">
          {{rivalry.name}}
        </li>
      </ul>
      <div *ngIf="selectedRivalry">
        <h2>
          {{selectedRivalry.name | uppercase}} is my hero
        </h2>
        <button (click)="gotoDetail()">View Details</button>
      </div>
    `
})

export class RivalriesComponent implements OnInit  {
  rivalries: Rivalry[];
  errorMessage: string;
  selectedRivalry: Rivalry;

  constructor(
    private _router: Router,
    private _rivalryService: RivalryService) {
  }

  ngOnInit() {
    this.getRivalries();
  }

  getRivalries() {
    this._rivalryService.getRivalries()
    .then(
      rivalries => this.rivalries = rivalries
    );
  }

  onSelect(rivalry: Rivalry) { this.selectedRivalry = rivalry; }

  gotoDetail() {
    this._router.navigate(['RivalryDetail', { id: this.selectedRivalry.id }]);
  }

}
