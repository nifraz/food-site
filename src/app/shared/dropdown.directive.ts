import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  //@HostBinding('getAttribute("aria-expanded")') ariaExpanded: boolean = false;
  ariaExpanded: boolean = false;
  @Input('appDropdown') dropdownUl!: HTMLUListElement;

  constructor(private ref: ElementRef) { }

  // @HostListener('click') onClick(){
  //   this.ariaExpanded = !this.ariaExpanded;
  //   let ulElement = this.ref.nativeElement.parentNode.getElementsByTagName('ul')[0];
  //   if (this.ariaExpanded) {
  //     ulElement.classList.add('show');
  //   } else {
  //     ulElement.classList.remove('show');
  //   }
  //   console.log(this.ariaExpanded);
  // }

  @HostListener('click') onClick(){
    this.ariaExpanded = !this.ariaExpanded;

    if (this.ariaExpanded) {
      this.dropdownUl.classList.add('show');
    } else {
      this.dropdownUl.classList.remove('show');
    }
  }
}


// If you want that a dropdown can also be closed by a click anywhere outside (which also means that a click on one dropdown closes any other one, btw.), replace the code of dropdown.directive.ts by this one (placing the listener not on the dropdown, but on the document):

// import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

// @Directive({
//   selector: '[appDropdown]'
// })
// export class DropdownDirective {
//   @HostBinding('class.open') isOpen = false;
//   @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
//     this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
//   }
//   constructor(private elRef: ElementRef) {}
// }
