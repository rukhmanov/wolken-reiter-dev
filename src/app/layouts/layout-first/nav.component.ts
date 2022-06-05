import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { AnimationRoutingNames, routeChangeAnimation } from 'src/app/animations/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [routeChangeAnimation],
})
export class NavComponent implements OnInit {
  userState: any

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
  }

  mainSelected() {
  }

  aboutSelected(): void {
    console.log(this.userState)
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
