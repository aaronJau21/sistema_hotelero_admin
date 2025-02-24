import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'shared-side-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css',
})
export class SideNavComponent {}
