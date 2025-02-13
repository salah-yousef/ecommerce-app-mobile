import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Banner2Component } from './banner2.component';

describe('Banner2Component', () => {
  let component: Banner2Component;
  let fixture: ComponentFixture<Banner2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Banner2Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Banner2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
