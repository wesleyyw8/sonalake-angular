import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListViewComponent } from './list-view/list-view.component';
import { CharacterEditComponent } from './character-edit/character-edit.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListViewComponent
  },
  {
    path: 'item/:id',
    component: CharacterEditComponent
  },
  {
    path: '', redirectTo: 'list', pathMatch: 'full',
  }, {
    path: '**', redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
