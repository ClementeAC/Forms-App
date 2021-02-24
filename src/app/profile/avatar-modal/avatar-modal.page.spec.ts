import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvatarModalPage } from './avatar-modal.page';

describe('AvatarModalPage', () => {
  let component: AvatarModalPage;
  let fixture: ComponentFixture<AvatarModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
