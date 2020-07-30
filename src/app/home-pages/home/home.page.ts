import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonSlides, Platform, IonRouterOutlet, MenuController } from '@ionic/angular';
import { NavController, IonContent } from '@ionic/angular';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { ConfigService } from 'src/providers/config/config.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('recentSlider', { static: false }) slider: IonSlides;

  segments = "topSeller"//first segment by default 
  scrollTopButton = false;//for scroll down fab 
  //for product slider after banner
  sliderConfig = {
    slidesPerView: this.config.productSlidesPerPage,
    spaceBetween: 0
  }


  constructor(
    public nav: NavController,
    public config: ConfigService,
    public router: Router,
    public platform: Platform,
    public menuCtrl: MenuController,
    private routerOutlet: IonRouterOutlet,
    public shared: SharedDataService, ) {
      this.platform.backButton.subscribe(()=>{
        if (!this.routerOutlet.canGoBack()) {
          if (this.router.url === "/tabs/home") {
            navigator['app'].exitApp();
          } else {
            this.openHomePage();
            this.menuCtrl.toggle();
          }
        }
      });
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.shared.hideSplashScreen();
  }

  // For FAB Scroll
  onScroll(e) {
    if (e.detail.scrollTop >= 500) {
      this.scrollTopButton = true;
    }
    if (e.detail.scrollTop < 500) {
      this.scrollTopButton = false;
    }
  }
  // For Scroll To Top Content
  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }
  openProducts(value) {
    this.nav.navigateForward(this.config.currentRoute + "/products/0/0/" + value);
  }
  ngAfterContentChecked() {
    //this.content.resize();
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
}
