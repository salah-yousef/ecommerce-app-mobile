import { Component, OnInit, ApplicationRef, ViewEncapsulation } from '@angular/core';
import { SharedDataService } from 'src/providers/shared-data/shared-data.service';
import { NavController } from '@ionic/angular';
import { ConfigService } from 'src/providers/config/config.service';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingService } from 'src/providers/loading/loading.service';
import { NavigationExtras } from '@angular/router';
import Swiper from 'swiper';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {

  public slideOpts: { [k: string]: any } = {
    autoplay: {
      delay: 2500,
      //disableOnInteraction: false,
    }
  };
  constructor(
    public shared: SharedDataService,
    public navCtrl: NavController,
    public config: ConfigService,
    public http: HTTP,
    public loading: LoadingService,
    private applicationRef: ApplicationRef,
  ) {

  }
  ionViewWillEnter() {


  }
  //===============================================================================================
  //on click image banners
  bannerClick = function (image) {    
    if (Object.keys(JSON.parse("{"+image[1]+"}"))[0] == 'category') {
      this.navCtrl.navigateForward(this.config.currentRoute + "/products/" + JSON.parse("{"+image[1]+"}").category + "/0/newest");
    }
    else if (Object.keys(JSON.parse("{"+image[1]+"}"))[0] == 'product') {
      this.getSingleProductDetail(JSON.parse("{"+image[1]+"}").product);
    }
    else {
      this.navCtrl.navigateForward(this.config.currentRoute + "/products/0/0/" + image.type);

    }
  }
  //===============================================================================================
  //getting single product data
  getSingleProductDetail(id) {
    this.loading.show();
    //if (this.type == 'recent' || this.type == 'wishList') {
    this.config.getWoo("products/" + id + "?" + this.config.productsArguments).then((data: any) => {
      //this.shared.showAlert("loaded");
      this.loading.hide();
      this.shared.singleProductPageData.push(data);
      this.navCtrl.navigateForward(this.config.currentRoute + "/product-detail/" + data.id);
      this.shared.addToRecent(data);
    }, err => {
      this.loading.hide();
      this.shared.showAlert("Item not Available!");
      console.log(err);
    });
  }
  applyFlipEffect() {
    this.slideOpts = {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      on: {
        beforeInit() {
          const swiper = this;
          swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
          const overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: true,
          };
          swiper.params = Object.assign(swiper.params, overwriteParams);
          swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
        },
        setTranslate() {
          const swiper = this;
          const { $, slides, rtlTranslate: rtl } = swiper;
          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = slides.eq(i);
            let progress = $slideEl[0].progress;
            if (swiper.params.flipEffect.limitRotation) {
              progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
            }
            const offset$$1 = $slideEl[0].swiperSlideOffset;
            const rotate = -180 * progress;
            let rotateY = rotate;
            let rotateX = 0;
            let tx = -offset$$1;
            let ty = 0;
            if (!swiper.isHorizontal()) {
              ty = tx;
              tx = 0;
              rotateX = -rotateY;
              rotateY = 0;
            } else if (rtl) {
              rotateY = -rotateY;
            }

            $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

            if (swiper.params.flipEffect.slideShadows) {
              // Set shadows
              let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
              let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
              if (shadowBefore.length === 0) {
                shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
                $slideEl.append(shadowBefore);
              }
              if (shadowAfter.length === 0) {
                shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
                $slideEl.append(shadowAfter);
              }
              if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
              if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
            }
            $slideEl
              .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
          }
        },
        setTransition(duration) {
          const swiper = this;
          const { slides, activeIndex, $wrapperEl } = swiper;
          slides
            .transition(duration)
            .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
            .transition(duration);
          if (swiper.params.virtualTranslate && duration !== 0) {
            let eventTriggered = false;
            // eslint-disable-next-line
            slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
              if (eventTriggered) return;
              if (!swiper || swiper.destroyed) return;

              eventTriggered = true;
              swiper.animating = false;
              const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
              for (let i = 0; i < triggerEvents.length; i += 1) {
                $wrapperEl.trigger(triggerEvents[i]);
              }
            });
          }
        }
      }
    };
  }
  applyCubeEffect() {
    this.slideOpts = {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      cubeEffect: {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
      on: {
        beforeInit: function () {
          const swiper = this;
          swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

          const overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            resistanceRatio: 0,
            spaceBetween: 0,
            centeredSlides: false,
            virtualTranslate: true,
          };

          this.params = Object.assign(this.params, overwriteParams);
          this.originalParams = Object.assign(this.originalParams, overwriteParams);
        },
        setTranslate: function () {
          const swiper = this;
          const {
            $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
          } = swiper;
          const params = swiper.params.cubeEffect;
          const isHorizontal = swiper.isHorizontal();
          const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
          let wrapperRotate = 0;
          let $cubeShadowEl;
          if (params.shadow) {
            if (isHorizontal) {
              $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
              if ($cubeShadowEl.length === 0) {
                $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                $wrapperEl.append($cubeShadowEl);
              }
              $cubeShadowEl.css({ height: `${swiperWidth}px` });
            } else {
              $cubeShadowEl = $el.find('.swiper-cube-shadow');
              if ($cubeShadowEl.length === 0) {
                $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
                $el.append($cubeShadowEl);
              }
            }
          }

          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = slides.eq(i);
            let slideIndex = i;
            if (isVirtual) {
              slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
            }
            let slideAngle = slideIndex * 90;
            let round = Math.floor(slideAngle / 360);
            if (rtl) {
              slideAngle = -slideAngle;
              round = Math.floor(-slideAngle / 360);
            }
            const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
            let tx = 0;
            let ty = 0;
            let tz = 0;
            if (slideIndex % 4 === 0) {
              tx = -round * 4 * swiperSize;
              tz = 0;
            } else if ((slideIndex - 1) % 4 === 0) {
              tx = 0;
              tz = -round * 4 * swiperSize;
            } else if ((slideIndex - 2) % 4 === 0) {
              tx = swiperSize + (round * 4 * swiperSize);
              tz = swiperSize;
            } else if ((slideIndex - 3) % 4 === 0) {
              tx = -swiperSize;
              tz = (3 * swiperSize) + (swiperSize * 4 * round);
            }
            if (rtl) {
              tx = -tx;
            }

            if (!isHorizontal) {
              ty = tx;
              tx = 0;
            }

            const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
            if (progress <= 1 && progress > -1) {
              wrapperRotate = (slideIndex * 90) + (progress * 90);
              if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
            }
            $slideEl.transform(transform$$1);
            if (params.slideShadows) {
              // Set shadows
              let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
              let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
              if (shadowBefore.length === 0) {
                shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
                $slideEl.append(shadowBefore);
              }
              if (shadowAfter.length === 0) {
                shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
                $slideEl.append(shadowAfter);
              }
              if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
              if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
            }
          }
          $wrapperEl.css({
            '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
            '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
            '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
            'transform-origin': `50% 50% -${swiperSize / 2}px`,
          });

          if (params.shadow) {
            if (isHorizontal) {
              $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
            } else {
              const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
              const multiplier = 1.5 - (
                (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
                + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
              );
              const scale1 = params.shadowScale;
              const scale2 = params.shadowScale / multiplier;
              const offset$$1 = params.shadowOffset;
              $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
            }
          }

          const zFactor = (swiper.browser.isSafari) ? (-swiperSize / 2) : 0;
          $wrapperEl
            .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
        },
        setTransition: function (duration) {
          const swiper = this;
          const { $el, slides } = swiper;
          slides
            .transition(duration)
            .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
            .transition(duration);
          if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
            $el.find('.swiper-cube-shadow').transition(duration);
          }
        },
      }
    }
  }
  applyCoverFlowEffect() {
    this.slideOpts = {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      on: {
        beforeInit() {
          const swiper = this;

          swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

          swiper.params.watchSlidesProgress = true;
          swiper.originalParams.watchSlidesProgress = true;
        },
        setTranslate() {
          const swiper = this;
          const {
            width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
          } = swiper;
          const params = swiper.params.coverflowEffect;
          const isHorizontal = swiper.isHorizontal();
          const transform$$1 = swiper.translate;
          const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
          const rotate = isHorizontal ? params.rotate : -params.rotate;
          const translate = params.depth;
          // Each slide offset from center
          for (let i = 0, length = slides.length; i < length; i += 1) {
            const $slideEl = slides.eq(i);
            const slideSize = slidesSizesGrid[i];
            const slideOffset = $slideEl[0].swiperSlideOffset;
            const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

            let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
            let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
            // var rotateZ = 0
            let translateZ = -translate * Math.abs(offsetMultiplier);

            let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
            let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

            // Fix for ultra small values
            if (Math.abs(translateX) < 0.001) translateX = 0;
            if (Math.abs(translateY) < 0.001) translateY = 0;
            if (Math.abs(translateZ) < 0.001) translateZ = 0;
            if (Math.abs(rotateY) < 0.001) rotateY = 0;
            if (Math.abs(rotateX) < 0.001) rotateX = 0;

            const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            $slideEl.transform(slideTransform);
            $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
            if (params.slideShadows) {
              // Set shadows
              let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
              let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
              if ($shadowBeforeEl.length === 0) {
                $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
                $slideEl.append($shadowBeforeEl);
              }
              if ($shadowAfterEl.length === 0) {
                $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
                $slideEl.append($shadowAfterEl);
              }
              if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
              if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
            }
          }

          // Set correct perspective for IE10
          if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
            const ws = $wrapperEl[0].style;
            ws.perspectiveOrigin = `${center}px 50%`;
          }
        },
        setTransition(duration) {
          const swiper = this;
          swiper.slides
            .transition(duration)
            .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
            .transition(duration);
        }
      }
    }
  }

  applyFadeEffect() {
    this.slideOpts = {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      on: {
        beforeInit() {
          const swiper = this;
          swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
          const overwriteParams = {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            watchSlidesProgress: true,
            spaceBetween: 0,
            virtualTranslate: true,
          };
          swiper.params = Object.assign(swiper.params, overwriteParams);
          swiper.params = Object.assign(swiper.originalParams, overwriteParams);
        },
        setTranslate() {
          const swiper = this;
          const { slides } = swiper;
          for (let i = 0; i < slides.length; i += 1) {
            const $slideEl = swiper.slides.eq(i);
            const offset$$1 = $slideEl[0].swiperSlideOffset;
            let tx = -offset$$1;
            if (!swiper.params.virtualTranslate) tx -= swiper.translate;
            let ty = 0;
            if (!swiper.isHorizontal()) {
              ty = tx;
              tx = 0;
            }
            const slideOpacity = swiper.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
              : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
            $slideEl
              .css({
                opacity: slideOpacity,
              })
              .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
          }
        },
        setTransition(duration) {
          const swiper = this;
          const { slides, $wrapperEl } = swiper;
          slides.transition(duration);
          if (swiper.params.virtualTranslate && duration !== 0) {
            let eventTriggered = false;
            slides.transitionEnd(() => {
              if (eventTriggered) return;
              if (!swiper || swiper.destroyed) return;
              eventTriggered = true;
              swiper.animating = false;
              const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
              for (let i = 0; i < triggerEvents.length; i += 1) {
                $wrapperEl.trigger(triggerEvents[i]);
              }
            });
          }
        },
      }
    }
  }
  ngOnInit() {

  }
  ngDoCheck() {
    if (this.config.bannerAnimationEffect == 'fade') this.applyFadeEffect();
    else if (this.config.bannerAnimationEffect == 'cube') this.applyCubeEffect();
    else if (this.config.bannerAnimationEffect == 'flip') this.applyFlipEffect();
    else if (this.config.bannerAnimationEffect == 'coverFlow') this.applyCoverFlowEffect();


    if (this.config.bannerStyle == "bottomBulletsWhiteBackground") {
      this.slideOpts.pagination = {
        el: '.swiper-pagination',
        dynamicBullets: true,
      }
    }

    if (this.config.bannerStyle == "progressBar") {
      this.slideOpts.pagination = {
        el: '.swiper-pagination',
        type: 'progressbar',
        progressbarOpposite: false
      }
    }

    if (this.config.bannerStyle == "numberBullets") {
      this.slideOpts.pagination = {
        el: '.swiper-pagination',
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
      }
    }
  }
}
