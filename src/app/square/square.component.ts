import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
    <button mat-button class="game-button" *ngIf="!value">{{ value }}</button>
    <button mat-button class="game-button" color="primary" *ngIf="value == 'X'">{{ value }}</button>
    <button mat-button class="game-button" color="warn" *ngIf="value == 'O'">{{ value }}</button>
  `,
  styles: ['.game-button { width: 100%; height: 100%; font-size: 5em !important; }']
})
export class SquareComponent {
  @Input() value: 'X' | 'O';
}
