import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromUserReducers  from '../../store/reducers/user.reducers';
import { signInSuccess } from '../../store/actions/user.action';
import { UserSelectors } from '../../store/selectors';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userState: any

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private store: Store<fromUserReducers.User>) {}

  ngOnInit() {
    this.store.pipe(select(UserSelectors.selectUserState))
    .subscribe((state) => {
     this.userState = state;
    })
  }

  mainSelected() {
    this.store.dispatch(signInSuccess({user: {
      name: 'Aleks',
      lastName: 'Rukhmanov',
      email: 'gmx.de',
    }}))
  }

  aboutSelected() {
    console.log(this.userState)
  }

}
