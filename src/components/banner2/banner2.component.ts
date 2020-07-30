import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';

@Component({
  selector: 'app-banner2',
  templateUrl: './banner2.component.html',
  styleUrls: ['./banner2.component.scss'],
})
export class Banner2Component implements OnInit {
  public slideOpts: { [k: string]: any } = {
    autoplay: {
      delay: 1500,
      //disableOnInteraction: false,
    }
  };
  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
  ) { }

  ngOnInit() {}

}
