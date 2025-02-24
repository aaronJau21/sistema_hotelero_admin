import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from "../../shared/components/ui/side-nav/side-nav.component";
import { NavBarComponent } from "../../shared/components/ui/nav-bar/nav-bar.component";

@Component({
  selector: 'app-dashboard-latout',
  imports: [RouterOutlet, SideNavComponent, NavBarComponent],
  templateUrl: './dashboard-latout.component.html',
  styleUrl: './dashboard-latout.component.css',
})
export class DashboardLatoutComponent {

  

}
