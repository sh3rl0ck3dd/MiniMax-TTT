  $(document).ready(function() {
    $(".X").click(function() {
      $(".choose, p").css("visibility", "hidden");
      $("td").css("visibility", "visible");
      $(".block").css("visibility", "visible");
      ait = "url(o.png)";
      hut = "url(x.png)";
    });
    $(".O").click(function() {
      $(".guys, p").css("visibility", "hidden");
      $("td").css("visibility", "visible");
      $(".block").css("visibility", "visible");

    });

    $("td").click(function() {
      move(this, huPlayer, hut);
    });
  });

  var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var huPlayer = "H";
  var aiPlayer = "C";
  var iter = 0;
  var round = 0;
  var ait = "url(x.png)";
  var hut = "url(o.png)";

  function move(element, player, symbol) {
    if (board[element.id] != "H" && board[element.id] != "C") {
      round++;
      $(element).css("background-image", symbol);
      $(element).css("background-size", "100px 100px");
      $(element).css("background-repeat", "no-repeat");

      board[element.id] = player;

      if (winning(board, player)) {
        setTimeout(function() {
          alert("YOU WIN");
          reset();
        }, 500);
        return;
      } 
      else if (round > 8) {
        setTimeout(function() {
          alert("TIE");
          reset();
        }, 500);
        return;
      }
       else {
        round++;
        var index = minimax(board, aiPlayer).index;
        var selector = "#" + index;
        $(selector).css("background-image", ait);
        $(selector).css("background-size", "100px 100px");
        $(selector).css("background-repeat", "no-repeat");

        board[index] = aiPlayer;
        if (winning(board, aiPlayer)) {
          setTimeout(function() {
            alert("YOU LOSE");
            reset();
          }, 500);
          return;
        } else if (round === 0) {
          setTimeout(function() {
            alert("tie");
            reset();
          }, 500);
          return;
        }
      }
    }
  }

  function minimax(reboard, player) {
   
    let array = avail(reboard);
   

      if (winning(reboard, huPlayer)) {
         return {
            score: -10
        };
    } 
    else if (winning(reboard, aiPlayer)) {
        return {
          score: 10
        };
    } 
    else if (array.length === 0) {
        return {
         score: 0};
    }

    var moves = [];
    
    for (var i = 0; i < array.length; i++) {
      var move = {};

      move.index = reboard[array[i]];

      reboard[array[i]] = player;

      if (player == aiPlayer) {
        var g = minimax(reboard, huPlayer);
        move.score = g.score;
      }
       else {
        var g = minimax(reboard, aiPlayer);
        move.score = g.score;
      }
      reboard[array[i]] = move.index;
      moves.push(move);
  }

    var bestMove;
    if (player === aiPlayer) {
      var bestScore = -10000;

      for (var i = 0; i < moves.length; i++) {

        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }

      }
    } 
    else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  function avail(reboard) {
    return reboard.filter(s => s != "H" && s != "C");
  }

  function reset() {
    round = 0;
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    $("td").css("background-image", "url(reset.png)");
    //console.log("i am here");

  }

  function winning(board, player) {
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return true;
    } else {
      return false;
    }
  }