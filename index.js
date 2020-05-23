const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

// Copied from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const pause = (time) => {
  // Defines a pause to help the game flow
  return setTimeout({}, time)
}

export const makeDeck = () => {
  // Creates and shuffles a deck of cards
  let deck = []
  [s, d, h, c].forEach(suit => {
    ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"].forEach(cardValue => {
      deck.append(`${value}${suit}`)
    })
  })
  return shuffle(deck)
}

export const makePlayerHand = (deck) => {
  // Returns hand and remaining deck
  const hand = [deck.pop(), deck.pop()]

  return [ hand, deck ]
}

export const makeDealerHand = (deck) => {
  // Returns dealer hand as [?, card, card] and remaining deck
  const hand = ['?', deck.pop(), deck.pop()]
  return [ hand, deck ]
}

export const showPlayerBoard = (playerName, playerHand) => {
  console.log(`${playerName}'s hand: ${playerHand} = ${totalHandValue(playerHand)}`);
}

export const showDealerBoard = (dealerHand) => {
  if (dealerHand[0] === '?') {
    console.log(`Dealer's hand: ${dealerHand[0, 1]}`);
  } else {
    console.log(`Dealer's hand: ${dealerHand} = ${totalHandValue(dealerHand)}`);
  }
}

export const showFullBoard = (playerName, playerHand, dealerHand) => {
  playerBoard(playerName, playerHand)
  dealerHand(dealerHand)
}


export const totalHandValue = (hand) => {
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

export const hit = (hand, deck) => {
  hand.append(deck.pop())
  return [ hand, deck ]
}

export const isBust = (hand) => {
  if (totalHandValue(hand) > 21) {
    return true
  } else {
    return false
  }
}

const playerTurn = (hand, deck) => {
  // Asks the player if they want to hit or stand and returns appropriately
  let userAction;
  while(!(userAction.startsWith("h") || userAction.startsWith('s'))) {
    readline.question(`Would you like to hit or stand?`, (action) => {
      userAction = action.toLowerCase();
      readline.close()
    })
  }

  if (userAction.startsWith("h")) {
    return hit(hand, deck)
  } else {
    return [hand, deck]
  }
}

const dealerTurn = (hand, deck) => {
  // Take dealer turn
  if (totalHandValue(hand) < 17) {
    hit(dealerHand)
  } else {
    return [hand, deck]
  }
}

const playAgain = () => {
  // Asks if user wants to play again

}

const whoWins = (playerHand, dealerHand) => {
  // Works out winner of game
  if (playerHand.length > 4 && !isBust(playerHand)) return ["player", "You got a 5 card trick! Well done you get a point."]
  if (isBust(playerHand)) return ["dealer", "You went bust! The dealer gets a point."]
  if (isBust(dealerHand)) return ["player", "The dealer went bust! You get a point."]
  if (totalHandValue(playerHand) > totalHandValue(dealerHand)) return ["player", "Your hand is worth more than the dealer's, you win!"]
  if (totalHandValue(dealerHand) > totalHandValue(player)) return ["player", "Unlucky, the dealer wins."]
  return ["tie", "The game is tied! Nobody gets a point this time..."]
}

const scoreBoard = () => {
  // Returns number of games user and dealer have won

}

const playFullHand = () => {
  let deck = makeDeck();

  let playerHand;
  [playerHand, deck] = makePlayerHand(deck)

  let dealerHand;
  [dealerHand, deck] = makePlayerHand(deck)

}

// Play Game now