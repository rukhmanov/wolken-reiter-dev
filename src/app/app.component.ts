import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntryCollection } from 'contentful';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentfulService } from './admin/contentful.service';
import { changeHandset } from './store/root-store/store/root.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Wolken-reiter';
  content!: EntryCollection<unknown>

  constructor(private contentful: ContentfulService, private breakpointObserver: BreakpointObserver, private store: Store<{ isHandset: boolean }>) {}

  ngOnInit(): void {
  this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => {
      this.store.dispatch(changeHandset({ isHandset: !result.matches }))
    }),
  ).subscribe();

    this.contentful.getContent
    .then((content: EntryCollection<unknown>) => {
      this.content = content
    })
  }
}
