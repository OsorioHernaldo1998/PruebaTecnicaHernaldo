import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayouPageInventoryComponent } from './pages/layout-page-inventory/layout-page-inventory.component';
import { SearchByProductComponent } from './pages/search-by-product/search-by-product.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { RouterModule } from '@angular/router';
import { SearchByCategoryComponent } from './pages/search-by-category/search-by-category.component';
import { NewProductComponent} from './pages/search-by-product/new-product/new-product.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewCategoryComponent } from './pages/search-by-category/new-category/new-category.component';
import { EditCategoryComponent } from './pages/search-by-category/edit-category/edit-category.component';
import { EditProductComponent } from './pages/search-by-product/edit-product/edit-product.component';



@NgModule({
  declarations: [LayouPageInventoryComponent,SearchByProductComponent,SearchByCategoryComponent,
    NewProductComponent,NewCategoryComponent,EditCategoryComponent,EditProductComponent],
  imports: [
    RouterModule,
    CommonModule,
    InventoryRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InventoryModule { }
