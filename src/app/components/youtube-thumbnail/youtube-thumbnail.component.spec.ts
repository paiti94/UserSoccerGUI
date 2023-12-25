import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeThumbnailComponent } from './youtube-thumbnail.component';

describe('YoutubeThumbnailComponent', () => {
  let component: YoutubeThumbnailComponent;
  let fixture: ComponentFixture<YoutubeThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeThumbnailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YoutubeThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
