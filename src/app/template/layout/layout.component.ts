import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  fullWidth:boolean = true;
  hasScrollbar = false;
  constructor( private cdr : ChangeDetectorRef) { }
  fullwidth() {
      this.fullWidth = !this.fullWidth;
  }

  ngOnInit(): void {
    
  }
  onfocus(element: FocusEvent) : void {
    let target: HTMLInputElement = element.target as HTMLInputElement;
    let parentNode: HTMLElement = target.parentNode as HTMLElement;
    if (parentNode.classList.contains('menuToggle')) {
        parentNode = (parentNode.parentNode as HTMLElement);
    }
    parentNode.classList.add('e-input-focus');
    parentNode.querySelector('.e-float-text').classList.add('e-label-top');
    parentNode.querySelector('.e-float-text').classList.remove('e-label-bottom');
      }
}
