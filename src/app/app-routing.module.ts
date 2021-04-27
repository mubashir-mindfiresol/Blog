import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { HomeComponent } from './components/home/home.component';
import { NewblogComponent } from './components/newblog/newblog.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { EditblogComponent } from './components/editblog/editblog.component';
import { UpdateBlogComponent } from './components/update-blog/update-blog.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path: 'homepage', component: HomepageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'upload-file',component: UploadFilesComponent},
  {path: 'view-post/:id', component: ViewPostComponent},
  {path: 'update-blog/:id', component: UpdateBlogComponent},
  {path: 'login', component: LoginComponent},
  {path: 'editblog',component: EditblogComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'admin', component: BoardAdminComponent },
  {path: 'newblog', component: NewblogComponent},
  {path: 'changepassword', component: ChangepasswordComponent},
  {path:"**", component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
