$('#settings .buttons .submit').onclick = async () => {
  const gameContentElement = $('#game .grow');
  const numberOfPlayers = Number($('#playerCount').value);
  const numberOfSpies = Number($('#spyCount').value);

  if (!numberOfPlayers || !numberOfSpies) {
    // TODO: send a toast to notify
    return false;
  }

  if (numberOfSpies >= numberOfPlayers) {
    // TODO: send a toast to notify
    return false;
  }

  let revealedCards = 0;
  const response = await fetch('wordlist.json');
  const allWords = shuffleArray(await response.json());
  const theWord = allWords[~~(Math.random() * allWords.length)];
  info(allWords);
  const playerStack = shuffleArray([
    ...Array.from({ length: numberOfSpies }, () => true),
    ...Array.from({ length: numberOfPlayers - numberOfSpies }, () => false),
  ]);

  const playerButtonsFragment = document.createDocumentFragment();
  playerStack.forEach((playerStatus, index) => {
    const playerButtonElement = document.createElement('button');
    playerButtonElement.textContent = 'Click to reveal';
    playerButtonElement.onclick = () => {
      if (playerButtonElement.hasAttribute('disabled')) {
        return false;
      }
      revealedCards++;
      playerButtonElement.textContent = 'Revaled';
      playerButtonElement.setAttribute('disabled', '');
      if (playerStack[index]) {
        // Player is an spy
        alert('You are an SPY!');
      } else {
        // Player is a regular player
        alert(theWord);
      }

      if (revealedCards >= playerStack.length) {
        empty(gameContentElement);

        const timerElement = document.createElement('div');
        timerElement.classList.add('timer');
        gameContentElement.appendChild(timerElement);

        const distance = 1 * 60000;
        const future = new Date(new Date().getTime() + distance);

        timerInterval = setInterval(() => {
          const currentDistance = future - new Date().getTime();
          let minutes = Math.floor(
            (currentDistance % (1000 * 60 * 60)) / (1000 * 60)
          );
          let seconds = Math.floor((currentDistance % (1000 * 60)) / 1000);
          if (seconds < 10) {
            seconds = String('0' + seconds);
          }
          timerElement.innerHTML = `${minutes}:${seconds}`;
          if (minutes == 0 && seconds <= 0) {
            clearInterval(timerInterval);
          }
        });
      }
    };
    playerButtonsFragment.appendChild(playerButtonElement);
  });
  gameContentElement.appendChild(playerButtonsFragment);

  page('game');
};

$('#settings .buttons .reset').onclick = () => {
  $('#playerCount').value = 3;
  $('#spyCount').value = 1;

  return true;
};

$$('nav button').forEach((navButton) => {
  navButton.addEventListener('click', (e) => {
    $('.left-menu').classList.toggle('open');
    let targetImage = null;
    if (e.currentTarget.querySelector('img').src.match('x.svg')) {
      targetImage = '/assets/images/menu.svg';
    } else {
      targetImage = '/assets/images/x.svg';
    }
    e.currentTarget.querySelector('img').src = targetImage;
  });
});

$('#newgame').addEventListener('click', (e) => {
  e.preventDefault();
  empty('#game .grow');
  closeMenu();
  page('settings');
});
