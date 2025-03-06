import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './sidebar/sidebar.component';
import { SearchBoxcomponent } from './sharedsearchbox/searchbox.component';
import { SharedTableComponent } from './sharedTable/shared-table.component';
import { SharedTable2Component } from './sharedtable2/sharedtable2.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [SideBarComponent, SearchBoxcomponent, SharedTableComponent,SharedTable2Component],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[ SideBarComponent, SearchBoxcomponent, SharedTableComponent, SharedTable2Component]
})
export class SharedModule {

 }
