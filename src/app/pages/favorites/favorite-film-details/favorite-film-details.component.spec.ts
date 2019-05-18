import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFilmDetailsComponent } from './favorite-film-details.component';

describe('FavoriteFilmDetailsComponent', () => {
  let component: FavoriteFilmDetailsComponent;
  let fixture: ComponentFixture<FavoriteFilmDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteFilmDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFilmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
