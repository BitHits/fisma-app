import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LoginPage } from './pages/login/login.page';
import { RouterModule, Routes } from '@angular/router';
import { NewProductPage } from './pages/new-product/new-product.page';
import { TabMenuModule } from 'primeng/tabmenu';
import { SalesComponent } from './pages/sales/sales.page';
import { MasterPage } from './pages/master.page';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './services/guard.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const ROUTES: Routes = [
  {
    path: "login",
    component: LoginPage
  },
  {
    path: "new-product",
    component: NewProductPage,
    canActivate: [AuthGuard]
  },
  {
    path: "sales",
    component: SalesComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    NewProductPage,
    SalesComponent,
    MasterPage

  ],
  imports: [
    BrowserModule,
    CardModule,
    TabViewModule,
    TabMenuModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
