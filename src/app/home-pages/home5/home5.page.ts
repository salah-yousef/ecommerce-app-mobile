import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { NavController, Platform, IonRouterOutlet, MenuController, LoadingController } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home5',
  templateUrl: './home5.page.html',
  styleUrls: ['./home5.page.scss'],
})
export class Home5Page implements OnInit{
  public messages;
  simCardImage = 'assets/simcard.png';
  @ViewChild('searchInput', { read: ElementRef,static: false }) searchInput: ElementRef; 
  constructor(
    public nav: NavController,
    public config: ConfigService,
    public shared: SharedDataService,
    public platform: Platform,
    public loadingController: LoadingController,
    private routerOutlet: IonRouterOutlet,
    public router: Router,
    public menuCtrl: MenuController,
    public alertController: AlertController,
    private location: Location
  ) {
    console.log('home');
    this.messages = new Array(100).fill({title: 'Hello'});
    this.platform.backButton.subscribe(()=>{
      if (!this.routerOutlet.canGoBack()) {
        if (this.router.url === "/tabs/home5") {
          this.presentAlertConfirm();
        } else {
          this.location.back();
        }
      }
    });
  }
  ionViewDidEnter() {
    this.shared.hideSplashScreen();
    this.searchInput.nativeElement.value = '';
    console.log(this.searchInput);
  }
  openSubCategories(parent) {
    let count = 0;
    for (let value of this.shared.allCategories) {
      if (value.parent == parent.id) { count++; }
      if (parent.id == 584) { count++; }
    }
    if (count != 0)
      this.nav.navigateForward("tabs/home5" + "/categories6/" + parent.id + "/" + parent.name);
    else
      this.nav.navigateForward("tabs/home5" + "/products/" + parent.id + "/" + parent.name + "/newest");
  }
  openSubSimCardPages() {
    this.presentLoading();
    this.nav.navigateForward("sim-card-services");
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    console.log('dd');
    this.config.setCardStyle("10");
  }
  openHomePage() {
    console.log('home page');
    console.log(this.config);
    if (this.config.appNavigationTabs) {
      if (this.config.homePage == 1) { this.nav.navigateForward("/tabs/home"); }
      if (this.config.homePage == 2) { this.nav.navigateForward("/tabs/home2"); }
      if (this.config.homePage == 3) { this.nav.navigateForward("/tabs/home3"); }
      if (this.config.homePage == 4) { this.nav.navigateForward("/tabs/home4"); }
      if (this.config.homePage == 5) { this.nav.navigateForward("/tabs/home5"); }
      if (this.config.homePage == 6) this.nav.navigateForward("/tabs/home6");
      if (this.config.homePage == 7) this.nav.navigateForward("/tabs/home7");
      if (this.config.homePage == 8) this.nav.navigateForward("/tabs/home8");
      if (this.config.homePage == 9) this.nav.navigateForward("/tabs/home9");
      if (this.config.homePage == 10) this.nav.navigateForward("/tabs/home10");
    }
    else {
      if (this.config.homePage == 1) { this.nav.navigateRoot("/home"); }
      if (this.config.homePage == 2) { this.nav.navigateRoot("/home2"); }
      if (this.config.homePage == 3) { this.nav.navigateRoot("/home3"); }
      if (this.config.homePage == 4) { this.nav.navigateRoot("/home4"); }
      if (this.config.homePage == 5) { this.nav.navigateRoot("/home5"); }
      if (this.config.homePage == 6) this.nav.navigateRoot("/home6");
      if (this.config.homePage == 7) this.nav.navigateRoot("/home7");
      if (this.config.homePage == 8) this.nav.navigateRoot("/home8");
      if (this.config.homePage == 9) this.nav.navigateRoot("/home9");
      if (this.config.homePage == 10) this.nav.navigateRoot("/home10");
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'خروج',
      message: '<strong>هل تريد الخروج</strong>',
      buttons: [
        {
          text: 'لا',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'نعم',
          handler: () => {
            console.log('Confirm Okay');
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
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
