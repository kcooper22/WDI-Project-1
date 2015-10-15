// console.log('yo');

//global variables
var playerImages = document.getElementById('player-hand');
var dealerImages = document.getElementById('dealer-hand');
var buttons = document.getElementById('player-buttons');
var dealButton = document.getElementById('deal-button');
var playerTotal = document.getElementById('player-total');
var dealerTotal = document.getElementById('dealer-total');
var playercount = 0;
var playerdealt = 0
var dealercount = 0;
var dealerdealt = 0
var dealerHand = [];
var playerHand = [];



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
	dealButton.onclick = function(){
		for (i=0; i<2; i++){

		//puts cards into dealer array and populates graphics onto screen
		dealerHand.push(myDeck.pop());
		cardImage(dealerHand[i], dealerImages);
		dealerdealt++

		//puts cards into player array and populates graphics onto screen
		playerHand.push(myDeck.pop());
		cardImage(playerHand[i], playerImages);
		playerdealt++
		}
		
		showCount();

		dealButton.onclick = function(){
			null;
		}
	}	
}

function showCount(){

	dealercount = 0;
	playercount = 0;

	for(p=0;p<dealerHand.length;p++){
		dealercount = dealercount + dealerHand[p].value;
		dealerTotal.innerHTML = dealercount;
	}

	for(p=0;p<playerHand.length;p++){
		playercount = playercount + playerHand[p].value;
		playerTotal.innerHTML = playercount;
	}

}

function playerTurn(){
		
		var hit = document.getElementById('hit-button');	
		var stay = document.getElementById('stay-button');
		
		hit.onclick = function(){
			// console.log('working');
			playerhit();

			if (playercount === 21) {
				console.log("win");
				dealerTurn();
				hit.onclick = function(){
					null;
				}
				stay.onclick = function(){
					null;
				}
			} 

			else if (playercount >21){
				console.log('bust');
				hit.onclick = function(){
					null;
				}
				stay.onclick = function(){
					null;
				}
				dealerTurn();
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
	playerdealt++
	showCount();
}

function dealerTurn(){
	console.log("dealer");
	if (playercount>21){
		console.log("dealer auto wins");
	}
	else if (dealercount === 21){
		console.log("dealer blackjack");
	}
	else if (dealercount < 17){
		dealerHand.push(myDeck.pop());
		cardImage(dealerHand[dealerdealt], dealerImages);
		dealercount++
		showCount();
		setTimeout(function() {dealerTurn();}, 1000);
	} 
	else if (dealercount >= 17 && dealercount <= 20){
		console.log("see who wins!");
	} 
	else if (dealercount > 21){
		console.log("bust");
	}
}

function playGame(){
	dealCards();
	playerTurn();
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

playGame();
