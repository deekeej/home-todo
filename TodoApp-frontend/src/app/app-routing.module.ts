import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/authentification/register/register.component';
import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [{ path: '', component: RegisterComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
