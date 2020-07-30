import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimCardServicesContainerPage } from './sim-card-services-container.page';

describe('SimCardServicesContainerPage', () => {
  let component: SimCardServicesContainerPage;
  let fixture: ComponentFixture<SimCardServicesContainerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimCardServicesContainerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimCardServicesContainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
