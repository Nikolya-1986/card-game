import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CardAnimations } from '../../animations/card-animation';
import { CardData } from '../../interfaces/card.interface';


@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  animations: CardAnimations.animations,
})
export class GameCardComponent {

  @Input() data!: CardData;
  @Output() cardClicked = new EventEmitter();

}