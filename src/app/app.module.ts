import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListViewComponent } from './list-view/list-view.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchInputComponent } from './search-input/search-input.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [AppComponent, ListViewComponent, SearchInputComponent, PaginationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
