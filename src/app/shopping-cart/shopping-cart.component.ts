import { Stuff } from './../stuff';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HWTPService } from '../hwtp.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://hwtp.herokuapp.com/orders/screen';

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

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor(private fb: FormBuilder, private hwtpService: HWTPService) {
    this.readyForm = fb.group({
      check: [false, Validators.required],
    });

    this.payForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      screen: ['', Validators.required],
      comment: ['']
    });

    this.buyedStuff = hwtpService.buyedStuffHandler.getArray();
    hwtpService.buyedStuff.subscribe((n: Stuff[]) => {
      this.buyedStuff = n;
    });
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
     };
  }

  cancelBuy(stuff: Stuff) {
    this.hwtpService.cancelBuy(stuff);
  }

  addOrder() {
    console.log(this.payForm.value, this.payForm.valid);
    if (this.payForm.valid) {
      this.hwtpService.addOrder(this.payForm.value).subscribe((res) => {
        this.uploader.uploadAll();
        this.isEditable = false;
      });
    }
  }

}
