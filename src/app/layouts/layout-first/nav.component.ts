import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { AnimationRoutingNames, routeChangeAnimation } from 'src/app/animations/animations';
import { select, Store } from '@ngrx/store';
import { getAuthData } from 'src/app/store/auth-store/auth.selectors';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [routeChangeAnimation],
})
export class NavComponent implements OnInit {
  authorized: boolean = false
  name!: string;
  surname!: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store, public authService: AuthService) {}

  ngOnInit(): void {
    this.subscribeUserData();
  }

  subscribeUserData(): void {
    this.store.pipe(select(getAuthData)).subscribe(data => {
      this.name = data.name
      this.surname = data.surname
      this.authorized = !!data.token
    })
  }

  mainSelected(): void {
  }

  aboutSelected(): void {
  }

  logout(): void {

  }

  getRouteAnimationState(outlet: RouterOutlet): AnimationRoutingNames {
    const resp = (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
    return resp
  }

}
