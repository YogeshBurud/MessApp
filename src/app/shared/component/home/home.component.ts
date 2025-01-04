import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AdminDashboardComponent } from '../../../feature/admin/component/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from '../../../feature/customer/component/customer-dashboard/customer-dashboard.component';
import { OwnerDashboardComponent } from '../../../feature/owner/component/owner-dashboard/owner-dashboard.component';

import { StorageService } from '../../../core/service/storage.service';
import { AuthenticationService } from '../../../core/service/authentication.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, AdminDashboardComponent, CustomerDashboardComponent, OwnerDashboardComponent,NgFor,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLoggedIn = false;
  isAdmin = false;
  isOwner = false;
  isCustomer = false;

  constructor(
    private storageService: StorageService,
    private authenticationService : AuthenticationService
  ) {  }

  ngOnInit(){
    this.isLoggedIn = this.storageService.isLoggedIn();

    if(this.isLoggedIn){
      let userInfo =  this.storageService.getUser();
      let role = userInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      
      role == "Admin" ? this.isAdmin = true : role == "Owner" ? this.isOwner = true : this.isCustomer = true;
    }
  }
}

