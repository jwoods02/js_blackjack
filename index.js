// Copied from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const pause = (time) => {
  // Defines a pause to help the game flow
  return setTimeout({}, time)
}

const makeDeck = () => {
  // Creates and shuffles a deck of cards
  let deck = []
  [s, d, h, c].forEach(suit => {
    ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"].forEach(cardValue => {
      deck.append(`${value}${suit}`)
    })
  })
  return shuffle(deck)
}

const makePlayerHand = (deck) => {
  // Returns hand and remaining deck
  const hand = [deck.pop(), deck.pop()]

  return { hand, deck }
}

const makeDealerHand = (deck) => {
  // Returns dealer hand as [?, card, card] and remaining deck
  const hand = ['?', deck.pop(), deck.pop()]
  return { hand, deck }
}

const showPlayerBoard = (playerName, playerHand) => {
  console.log(`${playerName}'s hand: ${playerHand} = ${totalHandValue(playerHand)}`);
}

const showDealerBoard = (dealerHand) => {
  if (dealerHand[0] === '?') {
    console.log(`Dealer's hand: ${dealerHand[0, 1]}`);
  } else {
    console.log(`Dealer's hand: ${dealerHand} = ${totalHandValue(dealerHand)}`);
  }
}

const showFullBoard = (playerName, playerHand, dealerHand) => {
  playerBoard(playerName, playerHand)
  dealerHand(dealerHand)
}


const totalHandValue = (hand) => {
  let totalValue = 0;
  hand.forEach(card => {
    if (card !== '?') {
      let cardValue = card[0];
      let numberOfAces = 0;

      if (cardValue in ["J", "Q", "K"]) cardValue = 10
      if (cardValue === 'A') {
        cardValue = 1;
        numberOfAces = numberOfAces + 1;
      }
      totalValue = totalValue + cardValue
    }

    if (numberOfAces > 0) {
      for (let i = 0; i < numberOfAces; i++) {
        // If high ace wouldn't bust add it
        if (totalValue < 12) {
          totalValue = totalValue + 10
        }
      }
    }

    return totalValue
  });
}

const hit = (hand, deck) => {
  hand.append(deck.pop())
  return { hand, deck }
}

const isBust = (hand) => {
  if (totalHandValue(hand) > 21) {
    return true
  } else {
    return false
  }
}

const playerTurn = () => {
  // Asks the player if they want to hit or stand and returns appropriately

}

const dealTurn = () => {
  // Take dealer turn

}

const playAgain = () => {
  // Asks if user wants to play again

}

const whoWins = () => {
  // WOrks out winner of game

}

const scoreBoard = () => {
  // Returns number of games user and dealer have won

}

// Play Game now