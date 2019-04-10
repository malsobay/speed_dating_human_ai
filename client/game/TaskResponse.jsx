import React from "react";
import Slider from "meteor/empirica:slider";
import {
  HTMLTable
} from "@blueprintjs/core";

export default class TaskResponse extends React.Component {
  handleChange = num => {
    const { player } = this.props;
    const value = Math.round(num * 100) / 100;
    player.round.set("value", value);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { player, round } = this.props;
    const value = player.round.get("value");
    const outcome = round.get("model_prediction") === "Yes" ? 1.0 : 0;
    const score = Math.pow(value - outcome, 2);
    player.round.set("score", score);
    this.props.player.stage.submit();
  };

  renderSubmitted() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>Waiting on other players...</h5>
          Please wait until all players are ready
        </div>
      </div>
    );
  }

  renderSlider() {
    const { player, stage } = this.props;
    const value = player.round.get("value");
    const isOutcome = stage.name === "outcome";
    return (
      <Slider
        min={0}
        max={1}
        stepSize={0.01}
        labelStepSize={0.25}
        onChange={this.handleChange}
        value={value}
        disabled={isOutcome}
        hideHandleOnEmpty
      />
    );
  }

  renderFeedback() {
    const { game, player, round } = this.props;

    return (
      <div>
        <HTMLTable>
          <thead>
            <tr>
              <th>Your guess</th>
              <th>Actual answer</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">{player.round.get("value")}</td>
              <td>{round.get("model_prediction")}</td>
              <td>
                <strong>
                  {player.round.get("score").toFixed(2)}
                </strong>
              </td>
            </tr>
          </tbody>
        </HTMLTable>
      </div>
    );
  };

  render() {
    const { player, stage } = this.props;

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="task-response">
        <form onSubmit={this.handleSubmit}>
          {this.renderSlider()}
          {stage.name === "outcome" ? this.renderFeedback() : null}
          <button type="submit">{stage.name === "outcome" ? "Next" : "Submit"}</button>
        </form>
      </div>
    );
  }
}
