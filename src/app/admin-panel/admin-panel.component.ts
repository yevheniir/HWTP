import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  currentRoute: any;
  orders = [];

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.router.events.subscribe((e: any) => {
      this.currentRoute = this.router.url;
    });

    try {
      this.orders = this.adminService.orderHandler.getArray();
    } catch {}

    this.adminService.orders.subscribe((orders) => {
      this.orders = orders;
      console.log(this.orders);
    });
  }

}
