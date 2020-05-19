import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faUsers, faCalendarAlt, faClock, faObjectGroup, faHome, faImages } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminPanelComponent implements OnInit {
  constructor() {}
  faUsers = faUsers;
  faCalendarAlt = faCalendarAlt;
  faClock = faClock;
  faObjectsGroup = faObjectGroup;
  faHome = faHome;
  faImages = faImages;
  ngOnInit() {}
}
