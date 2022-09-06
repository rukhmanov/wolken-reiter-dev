import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { AnimationRoutingNames, routeChangeAnimation } from 'src/app/animations/animations';
import { select, Store } from '@ngrx/store';
import { getAuthData } from 'src/app/store/auth-store/auth.selectors';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [routeChangeAnimation],
})
export class NavComponent implements OnInit {
  verified: boolean = false
  isPermissionConfirmed: boolean = false
  authorized: boolean = false
  name!: string | undefined;
  email!: string | undefined;
  surname!: string | undefined;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private breakpointObserver: BreakpointObserver,
    private store: Store,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.subscribeUserData();
  }

  subscribeUserData(): void {
    this.store.pipe(select(getAuthData)).subscribe(data => {
      this.authorized = !!data?.accessToken?.accessToken
      const user = data?.userData
      this.name = user?.name
      this.email = user?.email
      this.surname = user?.surname
    })
  }

  openDialog() {
    if(!this.email) return
    let config = this.api.getdialogConfig(`Please check your email: ${this.email}`)
    this.dialog.open(DialogComponent, config)
  }

  mainSelected(): void {
  }

  aboutSelected(): void {
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
