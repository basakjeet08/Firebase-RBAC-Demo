import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// These are the routes to the Whole App Module
const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'librarian',
    loadChildren: () =>
      import('./pages/librarian/librarian.module').then(
        (m) => m.LibrarianModule
      ),
  },
  {
    path: 'member',
    loadChildren: () =>
      import('./pages/member/member.module').then((m) => m.MemberModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
