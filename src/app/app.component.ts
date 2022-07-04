import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntryCollection } from 'contentful';
import { map, Observable, shareReplay, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentfulService } from './admin/contentful.service';
import { AuthService } from './services/auth.service';
import { changeHandset } from './store/root-store/store/root.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  destroy$ = new Subject();
  title = 'Wolken-reiter';
  content!: EntryCollection<unknown>

  constructor(private contentful: ContentfulService,
    private breakpointObserver: BreakpointObserver,
    private store: Store<{ isHandset: boolean }>,
    private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.setUserDataFromStorage()
    this.subscribeBreakpointsChange()
    this.getContentfulContent()
  }

  getContentfulContent() {
    this.contentful.getContent
    .then((content: EntryCollection<unknown>) => {
      this.content = content
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next('unsubscribe');
    this.destroy$.complete();
  }

  subscribeBreakpointsChange(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(result => {
        this.store.dispatch(changeHandset({ isHandset: !result.matches }))
      }),
      (takeUntil(this.destroy$))
    ).subscribe();
  }
}
