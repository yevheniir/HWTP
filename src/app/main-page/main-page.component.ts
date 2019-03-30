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
  filter = new Map<any, any[]>();

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

    hwtpService.filter$.subscribe((f: any) => {
      this.filter = new Map<any, any[]>(f);
    });
   }

  ngOnInit() {
  }

  buyStuff(e: any) {
    this.hwtpService.buyStuff(e.stuff, e.checked);
  }

  changeFilter(e: any) {
    this.hwtpService.changeFilter(e);
  }

}
