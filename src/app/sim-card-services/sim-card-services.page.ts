import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-sim-card-services',
  templateUrl: './sim-card-services.page.html',
  styleUrls: ['./sim-card-services.page.scss'],
})
export class SimCardServicesPage implements OnInit {
  simCardServicesPage : any[];
  name = '';
  parent: any;

  constructor(
    public shared: SharedDataService,
    public config: ConfigService,
    public router: Router,
    public nav: NavController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.simCardServicesPage = this.getChilderenPageById(11801);
  }
  
  openPage(data, id) {
    this.presentLoading();
    setTimeout(() => {
      console.log(data);
        if (data.length > 0) {
          let navigationExtras: NavigationExtras;
          if (id == 365) {
            navigationExtras = {
              queryParams: {
                  data: data,
                  name: this.simCardServicesPage[0].title
              }
            };
          } else {
            navigationExtras = {
              queryParams: {
                  data: data,
                  name: this.simCardServicesPage[1].title
              }
          };
          }
          
          this.nav.navigateForward("sim-card-services-container", navigationExtras);
      }
    }, 5000);
  }
  getChilderenPageById(id) {
    return this.shared.getChilderenPageById(id);
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
