import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';

@Component({
  selector: 'app-sim-card-services-container',
  templateUrl: './sim-card-services-container.page.html',
  styleUrls: ['./sim-card-services-container.page.scss'],
})
export class SimCardServicesContainerPage implements OnInit {
  data: any[];
  simCardServicesPage : any[];
  name = '';
  parent: any;
  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    public router: Router,
    public nav: NavController,
    public loadingController: LoadingController,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.data = params["data"];
      this.name = params["name"].rendered;
      this.simCardServicesPage = this.data;
      console.log(this.data);
      console.log(this.name);
    });
  }

  openPage(id) {
    console.log(id);
    this.presentLoading();
    setTimeout(() => {
      let navigationExtras: NavigationExtras = {
        queryParams: {
            id: id,
        }
      };
      console.log(navigationExtras)
          this.nav.navigateForward("sim-card-services-container-child", navigationExtras);
    }, 5000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '...من فضلك انتظر',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
