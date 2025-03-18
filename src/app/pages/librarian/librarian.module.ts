import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibrarianComponent } from './librarian.component';
import { RouterModule, Routes } from '@angular/router';

// These are the routes for the librarian module
const librarianRoutes: Routes = [{ path: '', component: LibrarianComponent }];

@NgModule({
  declarations: [LibrarianComponent],
  imports: [CommonModule, RouterModule.forChild(librarianRoutes)],
})
export class LibrarianModule {}
