import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { ComponentsModule } from '../components/components.module';
import { HistorySectionComponent } from './history-section/history-section.component';
import { TeamSectionComponent } from './team-section/team-section.component';
import { MemberCardComponent } from './member-card/member-card.component';

@NgModule({
  declarations: [AboutComponent, HistorySectionComponent, TeamSectionComponent, MemberCardComponent],
  imports: [CommonModule, AboutRoutingModule, ComponentsModule],
})
export class AboutModule {}
