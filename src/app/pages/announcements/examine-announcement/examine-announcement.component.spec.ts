import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamineAnnouncementComponent } from './examine-announcement.component';

describe('ExamineAnnouncementComponent', () => {
  let component: ExamineAnnouncementComponent;
  let fixture: ComponentFixture<ExamineAnnouncementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamineAnnouncementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamineAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
