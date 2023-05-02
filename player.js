const { Player } = TextAliveApp;

const player = new Player({
  app: { token: "aB9rO5Q99KqkSuKj" },
});


player.addListener({
  onTimerReady: () => {
    mode = 0;
    player.requestStop();
    canvas.elt.addEventListener("click", () => {
      mode = 1;
      player.requestPlay();
    });
  },
  onVideoReady: (v) => {
    let w = player.video.firstWord;
    while (w) {
      w.animate = animateWord;
      w = w.next;
    }
  },
  onStop: () => {
  },
  onAppReady: (app) => {
    if (!app.managed) {
      player.createFromSongUrl("https://piapro.jp/t/ucgN/20230110005414", {
        video: {
          // 音楽地図訂正履歴: https://songle.jp/songs/2427948/history
          beatId: 4267297,
          chordId: 2405019,
          repetitiveSegmentId: 2405019,
          // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FucgN%2F20230110005414
          lyricId: 56092,
          lyricDiffId: 9636
        },
      });
    }
  }
});
