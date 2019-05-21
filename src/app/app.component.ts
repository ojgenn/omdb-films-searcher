import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'omdb-films-searcher';
  private _titleSubscription$: Subscription;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _titleService: Title) {}


  ngOnInit(): void {
    this._titleSubscription$ = this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this._activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    )
      .subscribe((event) => this._titleService.setTitle(event['title']));
  }

  ngOnDestroy(): void {
    if (this._titleSubscription$) {
      this._titleSubscription$.unsubscribe();
    }
  }
}
