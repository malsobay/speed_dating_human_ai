import React, { Component } from "react";

import { Centered } from "meteor/empirica:core";
import { Button } from "@blueprintjs/core";

export default class Sorry extends Component {
  static stepName = "Sorry";

  render() {
    const { player } = this.props;
    let msg;
    let code;
    switch (player.exitStatus) {
      case "gameFull":
        msg = `Unfortunately, all games are full. You are still eligible to participate in future sessions, and will be compensated for showing up on time.`;
        code = "C5LWTCFM";
        break;
      case "gameLobbyTimedOut":
        msg = `Unfortunately, not enough players joined to begin the game. You will be compensated for your time via partial payment.`;
        code = "C5LWTCFM";
        break;
      case "playerEndedLobbyWait":
        msg =
          "You decided to stop waiting, we are sorry it was too long a wait.";
        break;
      default:
        msg =
          "Unfortunately, the game is unable to launch. Please reach out to the requester with a description of what happened.";
        break;
    }
    if (player.exitReason === "failedQuestion") {
      msg =
        "Unfortunately, you did not meet the conditions required to play the game.";
    }
    if (player.exitReason === "idleTimedOut" || player.exitReason === "idleTimedOutNoWarning") {
      msg =
        `You were detected to be idle and have been removed from the game.`;
      code = "IX4MDNU2";
    }
    if (player.exitReason === "lobbyIdleTimedOut") {
      msg =
      `You were detected to be idle and have been removed from the game.`;
      code = "LIX4MDNU2";
    }
    if (player.exitReason === "offlineTimedOut") {
      msg =
        `You were detected to be offline and have been removed from the game.`;
        code = "OX4MDNU2";
    }
    if (player.exitReason === "otherPlayersLeft") {
      msg =
        `Unfortunately, all other players have either disconnected or been removed for being idle. You will be compensated based on your performance up until this point in the game.`;
      code = "OPLM3NU2";
    }
    
    
    return (
      <Centered>
        <div className="score">
          <h4>Sorry!</h4>
          <p>Sorry, you were not able to play today! {msg}</p>
          <p>Please submit the task with the code <strong>{code}</strong></p>
        </div>
      </Centered>  
    );
  }
}
