import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core'
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import {MatCardModule} from '@angular/material/card';
import { AuthInterceptor } from './services/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NewblogComponent } from './components/newblog/newblog.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { PostTileComponent } from './components/post-tile/post-tile.component';
import { ViewPostComponent } from './components/view-post/view-post.component';
import { LikeButtonComponent } from './components/like-button/like-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    HomepageComponent,
    NotfoundComponent,
    ProfileComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    NewblogComponent,
    UploadFilesComponent,
    PostTileComponent,
    ViewPostComponent,
    LikeButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    HttpClientModule,
    MatCardModule,
    CKEditorModule,
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),
    NgxSpinnerModule,
    NgxPaginationModule
  ],
  providers: [[{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]],
  bootstrap: [AppComponent]
})
export class AppModule { }