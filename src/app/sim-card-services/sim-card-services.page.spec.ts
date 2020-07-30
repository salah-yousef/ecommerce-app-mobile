import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimCardServicesPage } from './sim-card-services.page';

describe('SimCardServicesPage', () => {
  let component: SimCardServicesPage;
  let fixture: ComponentFixture<SimCardServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimCardServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimCardServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
