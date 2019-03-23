import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {

  readyForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.readyForm = fb.group({
      check: [false, Validators.required],
    });
  }

  ngOnInit() {

  }
}
