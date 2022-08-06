import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoInputComponent } from './components/todos/todos-parts/todo-input/todo-input.component';
import { TodoItemComponent } from './components/todos/todos-parts/todo-item/todo-item.component';
import { TodoListComponent } from './components/todos/todos-parts/todo-list/todo-list.component';
import { todoReducer } from './todos-store/reducers';
import { StoreModule } from '@ngrx/store';
import { TodosComponent } from './components/todos/todos.component';
import { TodosEffects } from './todos-store/effects';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './components/authentification/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoItemComponent,
    TodoListComponent,
    TodosComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ todos: todoReducer }),
    EffectsModule.forRoot([TodosEffects]),
    EffectsModule.forFeature([TodosEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
