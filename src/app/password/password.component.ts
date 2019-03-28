import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  password: string;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }

  sendPassword() {
    this.adminService.sendPassword(this.password);
  }

}
