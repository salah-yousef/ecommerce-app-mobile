import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sim-card-services-container-child',
  templateUrl: './sim-card-services-container-child.page.html',
  styleUrls: ['./sim-card-services-container-child.page.scss'],
})
export class SimCardServicesContainerChildPage implements OnInit {
  data: Data;
  id = 0;
  name = '';
  parent: any;
  content: string;
  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    public router: Router,
    public nav: NavController,
    public loadingController: LoadingController,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = params["id"];
      console.log(this.id);
      this.shared.getPageById(this.id).then((data : Data) => {
        this.data = data;
        this.name = this.data.title.rendered;
        this.content = this.data.content.rendered;
        console.log(this.name);
        console.log(this.content);
      }).catch((e) => {
        console.error(e);
      });
      console.log( this.shared.getPageById(this.id));
      //console.log(this.data.content);
    });
  }


}
export interface Data {
  content: {rendered: string};
  title: {rendered: string};
}