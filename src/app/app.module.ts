import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@fim/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthModule } from '@fim/features/auth';
import { ShellModule } from '@fim/features/shell';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    MatProgressBarModule,
    ShellModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
