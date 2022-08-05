import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestartDialogComponent } from './components/restart-dialog/restart-dialog.component';
import { CardData } from './interfaces/card.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  cardImages = [
    'pDGNBK9A0sk',
    'fYDrhbVlV1E',
    'qoXgaF27zBc',
    // 'b9drVB7xIOI',
    // 'TQ-q5WAVHj0',
    // 'pFqrYbhIAXs',
    // 'eOLpJytrbsQ',
    // 'LF8gK8-HGSg',
    // '6i0ZIgu7drI'
  ];

  public cards: CardData[] = [];
  private flippedCards: CardData[] = [];
  private matchedCount = 0;

  constructor(
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this._setupCards();
  }

  public changeLanguage(code: string) {
    localStorage.setItem('locale', code);
    window.location.reload();
  };

  public cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this._checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  };

  private _shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  };

  private _setupCards(): void {
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this._shuffleArray(this.cards);
  };

  private _checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          const dialogRef = this.dialog.open(RestartDialogComponent, {
            disableClose: true
          });

          dialogRef.afterClosed().subscribe(() => {
            this._restart();
          });
        }
      }

    }, 1000);
  };

  private _restart(): void {
    this.matchedCount = 0;
    this._setupCards();
  };

}
