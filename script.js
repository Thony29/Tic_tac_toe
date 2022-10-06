const game = (() => {
  let xTurn = true;
  //score board
  let xState = [];
  let oState = [];
  const getxTurn = () => xTurn;
  const getoState = () => oState;
  const getxState = () => xState;

  //Helps to determine whose score to increase
  const addValue = (type, value) => {
    if (type === "xState") {
      xState.push(value);
    } else if (type === "oState") {
      oState.push(value);
    }
  };
  const endTurn = () => {
    xTurn = !xTurn;
  };

  //Restart game
  const restart = () => {
    xTurn = true;
    xState = [];
    oState = [];
  };

  //Game rules
  const rules = [
    //Rows
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    //Columns
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    //Diagonal
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];
  return {
    getxState,
    getoState,
    getxTurn,
    addValue,
    endTurn,
    restart,
    rules,
  };
})();
//
document.addEventListener("click", (event) => {
    //Find out which element we clicked on
  const target = event.target;
  const isCell = target.classList.contains("cell");
  const isDisabled = target.classList.contains("disabled");

  if (isCell && !isDisabled) {
    const cellValue = target.dataset.value;

    //helps to increase score
    game.getxTurn()
      ? game.addValue("xState", cellValue)
      : game.addValue("oState", cellValue);

    target.classList.add("disabled");
    target.classList.add(game.getxTurn() ? "x" : "o");
    game.endTurn();

    // Do not select all grid-cells that do not have the class of .disabled

    if (!document.querySelectorAll(".cell:not(.disabled)").length) {
      document.querySelector(".game_over").classList.add("visible");
      document.querySelector(".game_over_text").textContent = "Draw !";
    }

    game.rules.forEach((rule) => {
      const xWins = rule.every((state) => game.getxState().includes(state));

      //xWins and oWins returns true or false
      const oWins = rule.every((state) => game.getoState().includes(state));

      if (xWins || oWins) {
        document
          .querySelectorAll(".cell")
          .forEach((cell) => cell.classList.add("disabled"));
        document.querySelector(".game_over").classList.add("visible");

        document.querySelector(".game_over_text").textContent = xWins
          ? "X Wins !"
          : "O Wins !";
      }
    });
  }
});

//Resetting the game
document.querySelector(".restart_button").addEventListener("click", () => {
  document.querySelector(".game_over").classList.remove("visible");
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.classList.remove("disabled", "x", "o");
  });
  game.restart();
});
