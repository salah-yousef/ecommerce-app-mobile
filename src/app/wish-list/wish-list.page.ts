import { Component, OnInit } from '@angular/core';
import { NavController, Platform, IonRouterOutlet } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
})
export class WishListPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    public config: ConfigService,
    public shared: SharedDataService,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
    public storage: Storage) {
      this.platform.backButton.subscribe(() => {
        if (!this.routerOutlet.canGoBack()) {
          console.log('back');
          this.router.navigate(['home5']);
        }
      });
  }
  openProductsPage() {
    this.navCtrl.navigateForward("tabs/" + this.config.getCurrentHomePage());
  }
  ngOnInit() {
  }
}
