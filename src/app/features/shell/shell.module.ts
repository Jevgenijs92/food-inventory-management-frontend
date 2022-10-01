import { NgModule } from '@angular/core';
import { ShellComponent } from './shell.component';
import { HeaderModule } from './header';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShellComponent],
  imports: [HeaderModule, RouterModule],
})
export class ShellModule {}
