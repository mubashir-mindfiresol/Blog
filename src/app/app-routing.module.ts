import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { HomeComponent } from './components/home/home.component';
import { ImageuploadComponent } from './components/imageupload/imageupload.component';
import { NewblogComponent } from './components/newblog/newblog.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path: 'homepage', component: HomepageComponent},
  {path:'home', component: HomeComponent},
  {path:'imageupload',component: ImageuploadComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent },
  {path: 'admin', component: BoardAdminComponent },
  {path: 'newblog', component: NewblogComponent},
  {path:"**", component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
