import { Component, EventEmitter, Output } from "@angular/core";



@Component({
  selector:'shared-search-box',
  standalone:false,
  templateUrl: './searchbox.component.html'
})
export class SearchBoxcomponent{

  @Output()
  public OnValueSearch = new EventEmitter<string>();

  emitValue( value:string ): void{

    this.OnValueSearch.emit( value )

  }


}
