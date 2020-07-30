import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimCardServicesContainerChildPage } from './sim-card-services-container-child.page';

describe('SimCardServicesContainerChildPage', () => {
  let component: SimCardServicesContainerChildPage;
  let fixture: ComponentFixture<SimCardServicesContainerChildPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimCardServicesContainerChildPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimCardServicesContainerChildPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
