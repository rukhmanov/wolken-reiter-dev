import { Component, OnInit } from '@angular/core';
import { EntryCollection } from 'contentful';
import { IMainPageFields } from 'src/app/contentful-type';
import { environment } from 'src/environments/environment';
import { ContentfulService } from './contentful.service';
import {MatToolbarHarness} from '@angular/material/toolbar/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  url = environment.api
  title = 'wolken-reiter';
  content!: EntryCollection<unknown>

  constructor(private contentful: ContentfulService) {}

  ngOnInit(): void {
    this.contentful.getContent
    .then((content: EntryCollection<unknown>) => {
      this.content = content
      console.log(content)
    })
  }
}
