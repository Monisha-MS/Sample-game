import config from "../config.json"

// Class for managing a new game sessions
//includes initializing frames, pins, and scoring
export class StartNewGame {
  constructor(generalPins, players) {
    this.generalPins = generalPins;
    this.isGameStarted = false;
    this.ballIsRolled = false;

    this.entireFrames = [];
    this.pinsArray = [];
    this.currentFrameIndex = 0;
    this.totalAttempts = config.game.totalattempts;

    this.players = players;
    this.totalScores = new Array(players.length).fill(0);
    this.currentPlayerIndex = 0;
    this.initializeFrames();
  }
  //Method to initialize frames for each player
  initializeFrames() {
    this.currentFrameIndex = 0;
    for (let player = 1; player <= this.players.length; player++) {
      const frame = new Array(this.totalAttempts).fill().map(() => ({
        downPins: [],
        score: 0,
        bonus: null,
      }));
      this.entireFrames.push(frame);
    }
    this.initializePins();
  }
  // Method to initialize pins based on provided pin positions
  initializePins() {
    this.pinsArray = this.generalPins.map((pin) => ({
      pinId: pin.id,
      pinPosition: pin.position,
      isHit: false,
    }));
  }
  // Method to update game state with new game data -- every time new game is pressed
  updateToNewGame(newGame) {
    Object.assign(this, newGame);
  }
  // Method to switch to the next player -- activated after an attempt is completed for every player
  switchPlayer() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
    if (this.currentPlayerIndex === 0) {
      this.currentFrameIndex++;
    }
  }
  // Method to calculate the score for the current player in the current frame
  gameScoreCalculation() {
    const fallenPins = this.pinsArray.filter((pin) => pin.isHit === true);
    this.entireFrames[this.currentPlayerIndex][
      this.currentFrameIndex
    ].downPins = fallenPins;
    this.entireFrames[this.currentPlayerIndex][this.currentFrameIndex].score =
      fallenPins.length;
    if (fallenPins.length === config.game.totalpins) {
      this.entireFrames[this.currentPlayerIndex][this.currentFrameIndex].bonus =
        "strike";
    }
    this.totalScores[this.currentPlayerIndex] += fallenPins.length;
    return fallenPins.length;
  }
  // Method to calculate the total score for the current player
  totalScoreCalculation() {
    return this.totalScores[this.currentPlayerIndex];
  }
}
