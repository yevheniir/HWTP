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

  constructor(private hwtpService: HWTPService) {
    try {
    this.stuff = hwtpService.stuffHandler.getArray();
    } catch {}

    this.hwtpService.stuff.subscribe((stuff: Stuff[]) => {
      this.stuff = stuff;
    });

    this.buyedStuff = hwtpService.buyedStuffHandler.getArray();
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
