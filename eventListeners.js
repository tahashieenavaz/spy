$('#settings .buttons .submit').onclick = () => {
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
      playerButtonElement.textContent = 'Revaled';
      playerButtonElement.setAttribute('disabled', '');
      if (playerStack[index]) {
        // Player is an spy
        alert('You are an SPY!');
      } else {
        // Player is a regular player
        alert('The Word');
      }
    };
    playerButtonsFragment.appendChild(playerButtonElement);
  });
  $('#game .grow').appendChild(playerButtonsFragment);

  page('game');
};

$('#settings .buttons .reset').onclick = () => {
  $('#playerCount').value = 3;
  $('#spyCount').value = 1;

  return true;
};
