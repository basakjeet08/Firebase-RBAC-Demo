import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { RouterModule, Routes } from '@angular/router';

// These are the routes for the member module
const memberRoutes: Routes = [{ path: '', component: MemberComponent }];

@NgModule({
  declarations: [MemberComponent],
  imports: [CommonModule, RouterModule.forChild(memberRoutes)],
})
export class MemberModule {}
