--- Blackjack ---

Steps required: 
	0. Player places bet
	1. Build deck
	2. Shuffle cards
	3. Deal cards to deal, one face down
	4. Deal card to player, both face up
		a. If player has natural 21
			1. if dealer has natural 21 -> push
			2. if dealer doesnt have natural 21 -> win
		b. If player has less than 21
			1. take as many hits as player wants until satisfied or bust
		c. If player has not busted, reveal dealer card
			1. if dealer has natural 21 -> dealer wins
			2. if dealer has <17, dealer hits until >=17.
				a. if dealer busts -> player wins
		d. compare totals of dealer and player
			1. if player_total>dealer_total -> player wins
			2. if player_total<dealer_total -> dealer wins
			3. if player_total===dealer_total -> push, player bet returned