import { Component, OnInit } from "@angular/core";
import { CategoriaElement } from "../../interfaces/category.interface";
import { CategoryService } from "../../services/cateogory.service";
import { Router } from "@angular/router";



@Component({
  standalone: false,
  templateUrl: './search-by-category.component.html',
  selector: 'category'
})
export class SearchByCategoryComponent  implements OnInit {


  public categorias: CategoriaElement[] = [];


  constructor( private categoryService:CategoryService, private router: Router){ }

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe( (categorias) => this.categorias = categorias )
  }


  goNewCategory( ){
    this.router.navigateByUrl('/inventory/newcategory')
  }

  public searchTerm( value: string) {

    this.categoryService.searchCategoryByName( value ).subscribe((categorias)=> this.categorias = categorias )
     console.log( value);

 }

}
