window.onload = function()	{
	dealCards();
}

//global variables
var playerImages = document.getElementById('player-hand');
var dealerImages = document.getElementById('dealer-hand');
var buttons = document.getElementById('player-buttons');
var dealButton = document.getElementById('deal-button');
var playerTotal = document.getElementById('player-total');
var dealerTotal = document.getElementById('dealer-total');
var hit = document.getElementById('hit-button');	
var stay = document.getElementById('stay-button');
var playercount = 0; //card total for the player
var playerdealt = 0; // number of cards dealt for player in the game
var dealercount = 0;// card total for the dealer
var dealerdealt = 0; // number of cards dealt for the dealer
var playeraces = 0; //number of aces recieved
var dealeraces = 0; // number of aces received
var dealerHand = [];
var playerHand = [];
var myDeck = [];
var wallet = 100;
var bet = 0;

//
// Object related functions
//
// function to create card object
function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

//function that builds a deck of 52 cards with values, names, and suits
function deck(){
    this.names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['hearts','diams','spades','clubs'];
    this.cardValue = [11,2,3,4,5,6,7,8,9,10,10,10,10];
    var cards = [];
    
    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            cards.push( new card( this.cardValue[n], this.names[n], this.suits[s] ) );
        }
    }
    return cards;
}

//
// Gameplay functions
//

//functions that shuffles an array
function shuffle(deck) {
	for(var j, x, i = deck.length; i; j = Math.floor(Math.random() * i), x = deck[--i], deck[i] = deck[j], deck[j] = x);
		return deck;
};

// function to deal inital hands to the dealer and player
function dealCards(){
	dealButton.onclick = function(){
		//creates and shuffles a deck
		myDeck = deck();

		shuffle(myDeck);

		//resets global variables for next hand
		playercount = 0;
		playerdealt = 0;
		dealercount = 0;
		dealerdealt = 0;
		playeraces = 0;
		dealeraces = 0;
		dealerHand = [];
		playerHand = [];

		dealerImages.innerHTML = "";

		playerImages.innerHTML = "";

		wallet = wallet - 5;
		bet = bet + 5;

		for (i=0; i<2; i++){

			//puts cards into dealer array and populates graphics onto screen
			dealerHand.push(myDeck.pop());
			cardImage(dealerHand[i], dealerImages);
			dealercount = dealercount + dealerHand[i].value;
			if (dealerHand[i].name === 'A'){
				dealeraces++
			}
			dealerdealt++;

			//puts cards into player array and populates graphics onto screen
			playerHand.push(myDeck.pop());
			cardImage(playerHand[i], playerImages);
			playercount = playercount + playerHand[i].value;
			if (playerHand[i].name === 'A'){
				playeraces++
			}
			playerdealt++;
		}

		//sets first card of the dealers hand to black, to be revealed after players turn is over
		var firstCard = document.querySelector('.card');
		firstCard.setAttribute('id','firstCard');
		// firstCard.setAttribute('style','color:black');
		console.log(firstCard);

		showCount();

		dealButton.onclick = function(){
			null;
		}
		playerTurn();
	}	
}

// function to display each players total
//
// Will revise function to take parameter
//
function showCount(){

	dealerTotal.innerHTML = dealercount;

	playerTotal.innerHTML = playercount;
}

// function for player turn
function playerTurn(){

	//check if player has blackjack
	if (playerHand.length === 2 && playercount === 21){
		playerBlackjack();
	}	
	
	//activates hit button to deal another card to the player on click	
	hit.onclick = function(){
		playerhit();

		//stops player drop drawing more cards if they have 21
		if (playercount === 21) {
			console.log("player max");
			dealerTurn();
			firstCard.removeAttribute('id');
			hit.onclick = function(){
				null;
			}
			stay.onclick = function(){
				null;
			}
		} 

		// if player busts, checks to see if they have an ace, if not they bust
		else if (playercount >21){
			if (playeraces > 0) {
				playercount = playercount - 10;
				playeraces--;
				showCount();

				if (playercount === 21) {
					console.log("player max");
					dealerTurn();
					firstCard.removeAttribute('id');
					hit.onclick = function(){
						null;
					}
					stay.onclick = function(){
						null;
					}
				}
			} else {
				console.log('bust');
				hit.onclick = function(){
					null;
				}
				stay.onclick = function(){
					null;
				}
				firstCard.removeAttribute('id');
				playerBust();
			}
		}
		}

	// stay button removes function from hit/stay and starts the dealers turn
	stay.onclick = function(){
		console.log('stay');
		dealerTurn();
		firstCard.removeAttribute('id');
		stay.onclick = function(){
				null;
			}
		hit.onclick = function(){
				null;
			}	
	}			
}

//deals player an additional card
function playerhit(){
	playerHand.push(myDeck.pop());
	cardImage(playerHand[playerdealt], playerImages);
	playercount = playercount + playerHand[playerdealt].value;
	if (playerHand[playerdealt].name === 'A'){
		playeraces++
	}
	playerdealt++
	showCount();
}

//
// Dealers Turn
//
function dealerTurn(){
	//checkes for dealer blackjack
	if (dealerHand.length === 2 && dealercount === 21){
		dealerBlackjack();
	}
	// if dealer has less than 17, will draw cards until at 17 or greater
	else if (dealercount < 17){
		dealerHand.push(myDeck.pop());
		cardImage(dealerHand[dealerdealt], dealerImages);
		dealercount = dealercount + dealerHand[dealerdealt].value;
		dealercount++
		if (dealerHand[dealerdealt].name === 'A'){
			dealeraces++
		}
		showCount();
		setTimeout(function() {dealerTurn();}, 1000);
	} 

	else if (dealercount >= 17 && dealercount <= 21){
		checkForWin();
	} 

	else if (dealercount > 21){
		if (dealeraces > 0) {
				dealercount = dealercount - 10;
				dealeraces--;
				showCount();
				setTimeout(function() {dealerTurn();}, 1000);
			} else {
		dealerBust();
	}
	}
}

//generates graphics for the cards and attaches them to respective hands
function cardImage(play, hand) {       

	div = document.createElement('div');
    div.className = 'card';
	
    if (play.suit === 'diams' || play.suit === 'hearts'){
    	div.className = div.className + ' red';
    }

    var ascii_char = '&' + play.suit + ';';

    div.innerHTML = '<span class="number">' + play.name + '</span><span class="suit">' + ascii_char + '</span>';
    hand.appendChild(div);
}

//
//Win Conditions
//
function playerBust(){
	console.log('player bust');
	dealCards();
	bet = 0;
}

function playerBlackjack(){
	if (dealercount != 21){
		bet * 3;
		wallet = wallet + bet;
		bet = 0;
	} else {
		wallet = wallet + bet;
		bet = 0;
	}
	dealCards();
}

function checkForWin(){
	if (dealercount > playercount){
		bet = 0;
		console.log('dealer greater');
	} else if (playercount > dealercount){
		bet * 2;
		wallet = wallet + bet;
		bet = 0;
		console.log('player greater');
	} else if (dealercount === playercount){
		wallet = wallet + bet;
		bet = 0;
		console.log('push');
	}
	dealCards();
}

function dealerBlackjack(){
	bet = 0;
	dealCards();
}

function dealerBust(){
	wallet = wallet + bet;
	bet = 0;
	dealCards();
}