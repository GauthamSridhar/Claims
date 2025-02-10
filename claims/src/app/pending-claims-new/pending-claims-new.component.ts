import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pending-claims-new',
  imports: [CommonModule],
  templateUrl: './pending-claims-new.component.html',
  styleUrls: ['./pending-claims-new.component.css']
})
export class PendingClaimsNewComponent implements OnInit {
  activeTab: string = '1'; 
  dashboardUrl: SafeResourceUrl | null = null; 

  constructor(
    private sanitizer:DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.activeTab = params['tab'] || '1'; 
      this.updateDashboardUrl();
    });
  }

  setActiveTab(tab: string) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      this.updateDashboardUrl();
    }
  }

  updateDashboardUrl() {
    const urls: { [key: string]: string } = {
      '1': 'www.wikipedia.org',
      '2': 'www.angular.io'
    };
    this.dashboardUrl = this.sanitizer.bypassSecurityTrustResourceUrl(urls[this.activeTab] || urls['1']);
  }
}
