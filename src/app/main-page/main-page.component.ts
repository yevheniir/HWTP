import { Component, OnInit } from '@angular/core';
import { HWTPService } from '../hwtp.service';
import { Stuff } from '../stuff';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  stuff: Stuff[];
  buyedStuff = [];
  summ = 0;

  constructor(private hwtpService: HWTPService) {
    this.stuff = this.hwtpService.stuff;

    hwtpService.summ.subscribe((n: number) => {
      this.summ = n;
    });

    hwtpService.buyedStuff.subscribe((n: any) => {
      this.buyedStuff = n;
    });
   }

  ngOnInit() {
  }

  buyStuff(e: any) {
    this.hwtpService.buyStuff(e.stuff, e.checked);
  }

}
