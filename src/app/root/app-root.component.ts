import { Http } from '@angular/http';
import { Component, ViewEncapsulation } from '@angular/core';

import {
  RpAppSwitcherItemData as AppSwitcherItemData
} from 'src/lib/header/app-switcher/app-switcher-item-data.interface';

import { AppLayoutService } from 'src/lib/common/services/app-layout.service';
import { RpHeaderDataInterface as HeaderData } from 'src/lib/header/header/header-data.interface';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})

export class AppRootComponent {
  navData: any[];
  headerData: HeaderData;
  appSwitcherData: AppSwitcherItemData[];

  constructor(
    private http: Http,
    private layout: AppLayoutService) {

    this.http.get('assets/mocks/nav.json').subscribe((resp) => {
      this.navData = resp.json().data;
    });

    this.http.get('assets/mocks/header.json').subscribe((resp) => {
      this.headerData = resp.json();
    });

    this.http.get('assets/mocks/app-switcher.json').subscribe((resp) => {
      this.appSwitcherData = resp.json().products;
    });
  }

  getState() {
    return this.layout.getState();
  }
}
