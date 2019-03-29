import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { HWTPService } from '../hwtp.service';
import { Stuff } from '../stuff';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  currentRoute: any;
  orders = [];
  stuff = [];

  constructor(private router: Router, private adminService: AdminService, private hwtpService: HWTPService) { }

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
    });

    try {
      this.stuff = this.hwtpService.stuffHandler.getArray();
    } catch {}

    this.hwtpService.stuff.subscribe((stuff) => {
      this.stuff = stuff;
    });
  }

  deleteStuff(stuff: Stuff) {
    this.adminService.deleteStuff(stuff);
  }

  deleteOrder(order: any) {
    this.adminService.deleteOrder(order);
  }

  cancelOrder(order: any) {
    this.adminService.cancelOrder(order);
  }

  commentOrder(obj: any) {
    this.adminService.commentOrder(obj.order, obj.comment);
  }

  exit() {
    this.adminService.error(false);
  }

}
