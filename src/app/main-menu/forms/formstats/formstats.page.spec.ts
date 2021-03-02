import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormstatsPage } from './formstats.page';

describe('FormstatsPage', () => {
  let component: FormstatsPage;
  let fixture: ComponentFixture<FormstatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormstatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormstatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
