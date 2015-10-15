// console.log('yo');

var playerImages = document.getElementById('player-hand');
var dealerImages = document.getElementById('dealer-hand');
var playercount = 0;
var playerTotal = document.getElementById('player-total');

// function to create card object
function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

//function that builds a deck of 52 cards with values, names, and suits
function deck(){
    this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['Hearts','Diamonds','Spades','Clubs'];
    this.cardValue = [11,2,3,4,5,6,7,8,9,10,10,10,10];
    var cards = [];
    
    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            cards.push( new card( this.cardValue[n], this.names[n], this.suits[s] ) );
        }
    }
    return cards;
}

//functions that shuffles an array
function shuffle(deck) {
	for(var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
		return deck;
};

//creates and shuffles a deck
var myDeck = deck();

shuffle(myDeck);

console.log(myDeck);

// function to deal inital hands to the dealer and player
function dealCards(){
	var dealerHand = [];
	var playerHand = [];

	for (i=0; i<2; i++){

		//puts cards into dealer array and populates graphics onto screen
		dealerHand.push(myDeck.pop());
		cardImage(dealerHand[i], dealerImages);

		//puts cards into player array and populates graphics onto screen
		playerHand.push(myDeck.pop());
		cardImage(playerHand[i], playerImages);
	}
	
	for(p=0;p<playerHand.length;p++){
		playercount = playercount + playerHand[p].value;
		playerTotal.innerHTML = playercount;
	}
}

dealCards();



function cardImage(play, hand) {       

	div = document.createElement('div');
    div.className = 'card'; 

    if(play.suit == 'Diamonds'){
        var ascii_char = '&diams;';
    } else {
        var ascii_char = '&' + play.suit.toLowerCase() + ';';
    }

    div.innerHTML = '<span class="number">' + play.name + '</span><span class="suit">' + ascii_char + '</span>';
    hand.appendChild(div);
}
