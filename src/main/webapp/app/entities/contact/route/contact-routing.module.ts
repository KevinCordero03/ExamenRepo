import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ContactComponent } from '../list/contact.component';
import { ContactDetailComponent } from '../detail/contact-detail.component';
import { ContactUpdateComponent } from '../update/contact-update.component';
import { ContactRoutingResolveService } from './contact-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';
import { Authority } from '../../../config/authority.constants';

const contactRoute: Routes = [
  {
    path: '',
    component: ContactComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContactDetailComponent,
    resolve: {
      contact: ContactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    data: {
      authorities: [Authority.ADMIN, Authority.ORGANIZATION],
    },
    component: ContactUpdateComponent,
    resolve: {
      contact: ContactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContactUpdateComponent,
    resolve: {
      contact: ContactRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(contactRoute)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
