class Storage {
  storeTopScore(topScore) {
    if (localStorage.getItem('topScore') == null) {

      topScore.textContent = 0;
      localStorage.setItem('topScore', JSON.stringify(topScore.textContent));

    } else if (topScore.textContent > localStorage.getItem('topScore')) {

      localStorage.setItem('topScore', JSON.stringify(topScore.textContent));

    } else {

      topScore.textContent = JSON.parse(localStorage.getItem('topScore'));

    }
  }

  playedBefore() {
    localStorage.setItem('playedBefore', true);
  }

  removeHistory() {
    localStorage.removeItem('playedBefore');
  }
}