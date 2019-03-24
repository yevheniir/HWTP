import { Stuff } from './../stuff';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HWTPService } from '../hwtp.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  isEditable = true;
  readyForm: FormGroup;
  payForm: FormGroup;
  buyedStuff: Stuff[] = [];

  constructor(private fb: FormBuilder, private hwtpService: HWTPService) {
    this.readyForm = fb.group({
      check: [false, Validators.required],
    });

    this.payForm = fb.group({
      email: ['', Validators.email],
      screen: ['', Validators.required],
      comment: ['']
    });

    this.buyedStuff = hwtpService.buyedStuffHandler.getArray();
    hwtpService.buyedStuff.subscribe((n: Stuff[]) => {
      this.buyedStuff = n;
    });
  }

  ngOnInit() {
  }

  cancelBuy(stuff: Stuff) {
    this.hwtpService.cancelBuy(stuff);
  }
}
