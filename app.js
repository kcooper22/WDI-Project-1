window.onload = function()	{
	playGame();
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
var playercount = 0;
var playerdealt = 0;
var dealercount = 0;
var dealerdealt = 0;
var playeraces = 0;
var dealeraces = 0;
var dealerHand = [];
var playerHand = [];
var myDeck = [];


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

// function to deal inital hands to the dealer and player
function dealCards(){
	dealButton.onclick = function(){
		//creates and shuffles a deck
		myDeck = deck();

		shuffle(myDeck);

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

		for (i=0; i<2; i++){

			//puts cards into dealer array and populates graphics onto screen
			dealerHand.push(myDeck.pop());
			cardImage(dealerHand[i], dealerImages);
			dealercount = dealercount + dealerHand[i].value;
			if (dealerHand[i].name === 'A'){
				dealeraces++
			}
			dealerdealt++

			//puts cards into player array and populates graphics onto screen
			playerHand.push(myDeck.pop());
			cardImage(playerHand[i], playerImages);
			playercount = playercount + playerHand[i].value;
			if (playerHand[i].name === 'A'){
				playeraces++
			}
			playerdealt++
		}

		showCount();

		dealButton.onclick = function(){
			null;
		}
		playerTurn();
	}	
}

function showCount(){

	dealerTotal.innerHTML = dealercount;

	playerTotal.innerHTML = playercount;
}


function playerTurn(){

	if (playerHand.length === 2 && playercount === 21){
		playerBlackjack();
	}	
		
	hit.onclick = function(){
		// console.log('working');
		playerhit();

		if (playercount === 21) {
			console.log("player max");
			dealerTurn();
			hit.onclick = function(){
				null;
			}
			stay.onclick = function(){
				null;
			}
		} 

		else if (playercount >21){
			if (playeraces > 0) {
				playercount = playercount - 10;
				playeraces--;
				showCount();
			} else {
				console.log('bust');
				hit.onclick = function(){
					null;
				}
				stay.onclick = function(){
					null;
				}
				playerBust();
			}
		}
		}

	stay.onclick = function(){
		console.log('stay');
		dealerTurn();
		stay.onclick = function(){
				null;
			}
		hit.onclick = function(){
				null;
			}	
	}			
}

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

function dealerTurn(){
	// if (playercount>21){
	// 	console.log("dealer auto wins");
	// }
	if (dealercount === 21){
		console.log("dealer blackjack");
	}
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
	else if (dealercount >= 17 && dealercount <= 20){
		console.log("see who wins!");
	} 
	else if (dealercount > 21){
		if (dealeraces > 0) {
				dealercount = dealercount - 10;
				dealeraces--;
				showCount();
			} else {
		console.log("dealer bust");
	}
	}
}

//generates graphics for the cards and attaches them to respective hands
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

function playerBust(){
	console.log('dealer wins');
	dealCards();
}

function playerBlackjack(){
	console.log('player blackjack');
}

function playGame(){
	dealCards();
}