var MatchGame = {};


$(function() {
  var $game = $('#game');  
  var values = MatchGame.generateCardValues();  
  MatchGame.renderCards(values, $game);  
});

  // generates and returns an array of matching card values.
 
MatchGame.generateCardValues = function () {
  var sequentialValues = []; // array of 1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8

  for (var value = 1; value <= 8; value++) {
    sequentialValues.push(value);
    sequentialValues.push(value);
  }

  var cardValues = [];
  // randomize the array of cards
  while (sequentialValues.length > 0) {
    var randomIndex = Math.floor(Math.random() * sequentialValues.length);
    var randomValue = sequentialValues.splice(randomIndex, 1)[0];
    cardValues.push(randomValue);
  }

  return cardValues;
};

  // converts card values to jQuery card objects and adds them to the supplied game
  // object.

MatchGame.renderCards = function(cardValues, $game) {
  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  $game.empty();
  $game.data('flippedCards', []);  

  for (var valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
    var value = cardValues[valueIndex];
    var color = colors[value - 1];
    var data = {
      value: value,
      color: color,
      isFlipped: false
    };

    var $cardElement = $('<div class="col-xs-3 card"></div>');
    $cardElement.data(data);

    $game.append($cardElement);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });
};

  // flips over a given card and checks to see if two cards are flipped over. 

MatchGame.flipCard = function($card, $game) {  
  
  if ($card.data('isFlipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('isFlipped', true);

  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);
  
  // checking for a match 
  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {        
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      // updates styles on flipped cards if they are match
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);      
      var counter = parseInt($('#counter').text()) + 1;
      $('#counter').text(counter);                 
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      // updates styles on flipped cards if they are not match
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
      }, 250);
    }         
    $game.data('flippedCards', []);
  }
  if ($('#counter').text() === '8') {
    alert('Congratulations! Press \'ok\' to restart the game.');
    window.location.reload();
  }
};