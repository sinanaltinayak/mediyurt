import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamineRoomDialogComponent } from './examine-room-dialog.component';

describe('ExamineRoomDialogComponent', () => {
  let component: ExamineRoomDialogComponent;
  let fixture: ComponentFixture<ExamineRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamineRoomDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamineRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
