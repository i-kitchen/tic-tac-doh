import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button mat-button class="game-button" [color]="buttonColor">{{ value }}</button>
  `,
  styles: ['.game-button { width: 100%; height: 100%; font-size: 5em !important; }']
})
export class SquareComponent {
  @Input() value: 'X' | 'O';

  buttonColor = '';

  ngOnInit() {
    // Determine button color
    switch (this.value) {
      case 'X':
        this.buttonColor = 'primary';
        break;
      case 'O':
        this.buttonColor = 'warn';
        break;
      default:
        this.buttonColor = '';
    }
  }
}
