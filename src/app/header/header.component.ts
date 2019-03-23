import { Component, OnInit } from '@angular/core';
import { HWTPService } from '../hwtp.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  summ = 0;
  amount = 0;

  constructor(private hwtpService: HWTPService) {

    hwtpService.summ.subscribe((n: number) => {
      this.summ = n;
    });

    hwtpService.amount.subscribe((n: number) => {
      this.amount = n;
    });
   }


  ngOnInit() {
  }

}
