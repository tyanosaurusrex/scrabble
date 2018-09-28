var player = document.querySelector('.player');
var playerTiles = document.querySelector('.playerTiles');
var score = document.querySelector('.score');
var getTiles = document.querySelector('.getTiles');
var switchBtn = document.querySelector('.switchBtn');
var boards = document.querySelector('.boards');
var scoreBoards = document.querySelector('.scoreBoards');
boards.style.whiteSpace = 'pre';
scoreBoards.style.whiteSpace = 'pre';

var form = document.querySelector('.form');
var coordinate = document.querySelector('.coordinate');
var word = document.querySelector('.word');
var arah = document.querySelector('.arah');
var ok = document.querySelector('.ok');

var blankOption = document.querySelector('.blankOption');
var useBlankField = document.querySelector('.useBlank');
var useBlankBtn = document.querySelector('.useBlankBtn');

switchBtn.disabled = true;
blankOption.hidden = true;
var nowPlaying = 1;
var pass = 0;
var initGame = 1;

var susunTiles;
var board = [];
var scores = [];
var minusScore = 0;
var inhand;
var player1 = {
  player: 'Player 1',
  tiles: [],
  totalScore: 0
};
var player2 = {
  player: 'Player 2',
  tiles: [],
  totalScore: 0
};

for (var j = 1; j <= 15; j++) {
  board[j] = [];
  for (var i = 1; i <= 15; i++) {
    board[j][i] = '';
  }
}
boards.textContent = printBoard('letter');

for (var j = 1; j <= 15; j++) {
  scores[j] = [];
  for (var i = 1; i <= 15; i++) {
    scores[j][i] = '';
  }
}
scoreBoards.textContent = printBoard('score');

function printBoard(tileType) {
  var printBoard = '';
  for (var j = 0; j <= 15; j++) {
    for (var i = 0; i <= 15; i++) {
      if (j == 0) {
        if (i < 10) {
          printBoard += ` ${i}  `;
        } else if (i > 9 && i <= 15) {
          printBoard += `${i}  `;
        }
      } else if (i == 0) {
        if (j < 10) {
          printBoard += ` ${j}  `;
        } else if (j > 9 && j <= 15) {
          printBoard += `${j}  `;
        }
      } else if (j != 0 && i != 0) {
        var tile = (tileType === 'letter') ? board[j][i] : scores[j][i];
        var tileBoard = (tile !== '') ? tile : '-';
        printBoard += ` ${tileBoard}  `;
      }
    }
    printBoard += `\n`;
  }
  return printBoard;
}

var distribution = [{
    'huruf': 'blank',
    'point': 0,
    'jml': 2
  },
  {
    'huruf': 'A',
    'point': 1,
    'jml': 19
  },
  {
    'huruf': 'B',
    'point': 4,
    'jml': 4
  },
  {
    'huruf': 'C',
    'point': 8,
    'jml': 3
  },
  {
    'huruf': 'D',
    'point': 3,
    'jml': 4
  },
  {
    'huruf': 'E',
    'point': 1,
    'jml': 8
  },
  {
    'huruf': 'F',
    'point': 5,
    'jml': 1
  },
  {
    'huruf': 'G',
    'point': 3,
    'jml': 3
  },
  {
    'huruf': 'H',
    'point': 4,
    'jml': 2
  },
  {
    'huruf': 'I',
    'point': 1,
    'jml': 8
  },
  {
    'huruf': 'J',
    'point': 10,
    'jml': 1
  },
  {
    'huruf': 'K',
    'point': 2,
    'jml': 3
  },
  {
    'huruf': 'L',
    'point': 4,
    'jml': 3
  },
  {
    'huruf': 'M',
    'point': 2,
    'jml': 3
  },
  {
    'huruf': 'N',
    'point': 1,
    'jml': 9
  },
  {
    'huruf': 'O',
    'point': 1,
    'jml': 3
  },
  {
    'huruf': 'P',
    'point': 4,
    'jml': 2
  },
  {
    'huruf': 'R',
    'point': 1,
    'jml': 4
  },
  {
    'huruf': 'S',
    'point': 1,
    'jml': 3
  },
  {
    'huruf': 'T',
    'point': 1,
    'jml': 5
  },
  {
    'huruf': 'U',
    'point': 1,
    'jml': 5
  },
  {
    'huruf': 'V',
    'point': 8,
    'jml': 1
  },
  {
    'huruf': 'W',
    'point': 5,
    'jml': 1
  },
  {
    'huruf': 'Y',
    'point': 5,
    'jml': 2
  },
  {
    'huruf': 'Z',
    'point': 10,
    'jml': 1
  },
];

getTiles.addEventListener('click', takeTiles);

function takeTiles() {
  var bag = [];
  for (var i = 0; i < distribution.length; i++) {
    var dist = distribution[i];
    for (var j = 0; j < dist.jml; j++) {
      bag.push({
        huruf: dist.huruf
      });
    }
  }

  inhand = (nowPlaying == 1) ? player1.tiles : player2.tiles;

  var n = 7 - inhand.length;
  if (n == 0 && bag.length == 0) {
    gameOver();
  } else {
    for (var i = 0; i < n; i++) {
      var index = Math.floor(Math.random() * bag.length);
      var tile = bag[index];
      inhand.push(tile);

      distribution.map(obj => {
        if (tile.huruf == obj.huruf) {
          obj.jml = obj.jml - 1;
          return obj;
        }
      });
    }
    printTiles(inhand);
    getTiles.disabled = true;
    ok.disabled = false;
    switchBtn.disabled = false;
  }
}

switchBtn.addEventListener('click', switchPlayer);

function switchPlayer() {
  pass += 1;

  if (pass > 2) {
    gameOver();
  } else {
    nowPlaying = (nowPlaying === 1) ? 2 : 1;
    inhand = (nowPlaying === 1) ? player1.tiles : player2.tiles;
    playerScore = (nowPlaying === 1) ? player1.totalScore : player2.totalScore;

    player.textContent = 'Player ' + nowPlaying;
    score.textContent = playerScore;
    getTiles.disabled = false;
    switchBtn.disabled = true;
    blankOption.hidden = true;

    arah.value = 'x';
    word.value = '';
    coordinate.value = '';

    printTiles(inhand);
  }
}

function printTiles(tiles) {
  playerTiles.textContent = tiles.map(function (el) {
    return el.huruf;
  }).join('   ');
}

ok.addEventListener('click', play);

function play() {
  var kataArr = word.value.toUpperCase().split('');

  var posisi = coordinate.value.split(',');
  var abs = parseInt(posisi[0]);
  var ord = parseInt(posisi[1]);
  var direction = arah.value;

  inhand = (nowPlaying === 1) ? player1.tiles : player2.tiles;

  if (useBlankField.value !== '') {
    var blanks = useBlankField.value.split(',');
    for (var i = 0; i < blanks.length; i++) {
      var findPoint = distribution.find(function (el) {
        return blanks[i].toUpperCase() == el.huruf;
      });
      minusScore += findPoint.point;

      inhand.push({
        huruf: blanks[i].toUpperCase()
      });

      inhand.splice(inhand.findIndex(function (el) {
        return el.huruf === 'blank';
      }), 1);
    }
    blanks = [];
  }

  if (checkPos(direction, abs, ord, kataArr, inhand)) {
    var check = checkWord(inhand, kataArr);
    if (check.length == 0) {
      pass = 0;
      var wordScore = 0;
      for (var i = 0; i < kataArr.length; i++) {
        var findPoint = distribution.find(function (el) {
          return kataArr[i] == el.huruf;
        });
        wordScore += findPoint.point;

        board[ord][abs] = kataArr[i];
        scores[ord][abs] = findPoint.point;
        inhand.splice(inhand.findIndex(function (el) {
          return kataArr[i] == el.huruf;
        }), 1);

        if (direction === 'x') {
          abs = abs + 1;
        } else if (direction === 'y') {
          ord = ord + 1;
        }
      }
      wordScore = wordScore - minusScore;

      if (nowPlaying === 1) {
        player1.totalScore += wordScore;
      } else if (nowPlaying === 2) {
        player2.totalScore += wordScore;
      }

      playerScore = nowPlaying === 1 ? player1.totalScore : player2.totalScore;
      minusScore = 0;
      boards.textContent = printBoard('letter');
      scoreBoards.textContent = printBoard('score');
      score.textContent = playerScore;
      ok.disabled = true;
      blankOption.hidden = true;
      // console.log(distribution);
    } else {
      var findBlank = 0;
      for (var i = 0; i < inhand.length; i++) {
        if (inhand[i].huruf === 'blank') {
          findBlank += 1;
        }
      }

      if (findBlank > 0) {
        if (confirm('Huruf ' + check.join(', ') + ' tidak ada\nGunakan blank tile?')) {
          blankOption.hidden = false;
          minusScore = 0;
        }
      } else {
        alert('Huruf ' + check.join(', ') + ' tidak ada');
      }
    }
  } else {
    alert('Pilih titik koordinat lain');
  }
}

function checkPos(direction, abs, ord, kataArr, inhand) {
  if (initGame == 1) {
    if (direction === 'x') {
      if (ord !== 8 || abs > 8 || (abs + kataArr.length - 1) < 8) {
        return false;
      }
    } else if (direction === 'y') {
      if (abs !== 8 || ord > 8 || (ord + kataArr.length - 1) < 8) {
        return false;
      }
    }
  }
  for (var i = 0; i < kataArr.length; i++) {
    if (ord > 15 || abs > 15) {
      return false;
    } else if (board[ord][abs] !== '') {
      if (board[ord][abs] !== kataArr[i]) {
        return false;
      } else if (board[ord][abs] === kataArr[i]) {
        inhand.push({
          huruf: kataArr[i]
        });
      }
    }
    if (direction === 'x') {
      abs = abs + 1;
    } else if (direction === 'y') {
      ord = ord + 1;
    }
  }
  initGame = 0;
  return true;
}

function checkWord(inhand, kataArr) {
  var notExist = [];
  for (var i = 0; i < kataArr.length; i++) {
    var countKata = kataArr.filter(function (huruf) {
      return kataArr[i] == huruf;
    }).length;

    var countInhand = inhand.filter(function (el) {
      return kataArr[i] == el.huruf;
    }).length;

    if (countInhand < countKata) {
      notExist.push(kataArr[i]);
    }
  }
  return notExist;
}

function gameOver() {
  getTiles.disabled = true;
  switchBtn.disabled = true;
  coordinate.disabled = true;
  word.disabled = true;
  arah.disabled = true;
  ok.disabled = true;
  alert('Game Over');
}

useBlankBtn.addEventListener('click', play);