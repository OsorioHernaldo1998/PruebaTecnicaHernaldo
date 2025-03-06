import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayouPageInventoryComponent } from './pages/layout-page-inventory/layout-page-inventory.component';
import { SearchByCategoryComponent } from './pages/search-by-category/search-by-category.component';
import { SearchByProductComponent } from './pages/search-by-product/search-by-product.component';
import { NewProductComponent } from './pages/search-by-product/new-product/new-product.component';
import { NewCategoryComponent } from './pages/search-by-category/new-category/new-category.component';
import { EditCategoryComponent } from './pages/search-by-category/edit-category/edit-category.component';
import { EditProductComponent } from './pages/search-by-product/edit-product/edit-product.component';
import { AuthGuard } from '../auth/pages/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayouPageInventoryComponent,
    canActivate: [AuthGuard],  // Protegemos la ruta principal
    children: [
      {
        path: '',  // Ruta vacía redirige automáticamente
        redirectTo: 'byproduct',  // Redirige a /inventory/byproduct
        pathMatch: 'full',  // Asegúrate de usar 'full' para que la redirección funcione correctamente
      },
      {
        path: 'bycategory',
        component: SearchByCategoryComponent,
        canActivate: [AuthGuard],  // Protegemos la ruta hija
      },
      {
        path: 'byproduct',
        component: SearchByProductComponent,
        canActivate: [AuthGuard],  // Protegemos la ruta hija
      },
      {
        path: 'newproduct',
        component: NewProductComponent,
        canActivate: [AuthGuard],  // Protegemos la ruta hija
      },
      {
        path: 'newcategory',
        component: NewCategoryComponent,
        canActivate: [AuthGuard],  // Protegemos la ruta hija
      },
      {
        path: 'editproduct',
        component: EditProductComponent,
        canActivate: [AuthGuard],  // Protegemos la ruta hija
      },
      {
        path: 'editcategory',
        component: EditCategoryComponent,
        canActivate: [AuthGuard],  // Protegemos la ruta hija
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
