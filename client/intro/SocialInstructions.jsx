import React from "react";

import { Centered } from "meteor/empirica:core";

export default class SocialInstructions extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    if (game.treatment.socialInfoMode == "chat") {
    return (
      <Centered className="with-topper">
        <div className="instructions">
          <h1 className={"bp3-heading"}>Figuring out how to make the best use of the AI's predictions</h1>
          <p>
            You are simultaneously playing this game with {game.treatment.playerCount - 1} other participants. 
            Occasionally, you may have the opportunity to <strong>discuss the game with the other participants via a chat window.</strong> 
          </p>

          <p><strong>You should use the discussion stages to work with your teammates and find a strategy for using the AI's predictions to improve your own score.</strong></p>

          <h3>
            <u>Giving good advice pays off!</u>
          </h3>
          <p>
            At the end of the game (in the exit survey), you will have the option to choose <strong>one</strong> of your group members
            who you believe gave the best advice on how to use the AI's predictions; this person will receive a $1 bonus payment. <strong>Share useful advice with your teammates to receive their votes!</strong>
          </p>
          <p>
            If you feel that none of the advice you received was helpful, you can choose to not give a bonus to anyone.
          </p>

          <p className="action-step">
            <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button>
            <button type="button" onClick={onNext} disabled={!hasNext}>
              Next
            </button>
          </p>
        </div>
      </Centered>
    );
    }
    else if (game.treatment.socialInfoMode == "statusIndicators"){
      return(
        <Centered className="with-topper">
        <div className="instructions">
          <h1 className={"bp3-heading"}>Figuring out how to make the best use of the AI's predictions</h1>
          <p>
            You are simultaneously playing this game with {game.treatment.playerCount - 1} other participants. 
            Occasionally, you may have the opportunity to <strong>view a summary of how your group members are utilizing the AI's predictions.</strong> 
          </p>

          <p>You will be shown your <strong>group members' average reliance on the AI's predictions</strong>, as well as <strong>their current cumulative score.</strong></p>
          <p>Reliance on the AI is described as either "Contradicting", "Moderately reliant", or "Highly reliant", as detailed below:</p>
          <img src="reliance_levels.png" style={{maxWidth: "60%"}}></img>

          <p className="action-step">
            <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button>
            <button type="button" onClick={onNext} disabled={!hasNext}>
              Next
            </button>
          </p>
        </div>
      </Centered>

      );
    }
  }
}
