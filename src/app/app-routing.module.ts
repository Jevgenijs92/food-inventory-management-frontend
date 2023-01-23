import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginPageComponent } from '@fim/features/auth';
import { ShellComponent } from '@fim/features/shell';
import { RegisterPageComponent } from '@fim/features/auth/components/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@fim-features/homepage/homepage.module').then(
            (m) => m.HomepageModule
          ),
      },
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
