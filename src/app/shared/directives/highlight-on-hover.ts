import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core'


@Directive({
  selector: '[appHighlightOnHover]',
  standalone: true
})
export class HighlightOnHover {
  private el: ElementRef = inject(ElementRef);

  @Input() appHighlightOnHover: string = 'gray';
  @Input() defaultColor: string = 'transparent';

  constructor() {
    this.el.nativeElement.style.transition = 'background-color 0.3s';
    this.el.nativeElement.style.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlightOnHover || 'gray');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.defaultColor);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
