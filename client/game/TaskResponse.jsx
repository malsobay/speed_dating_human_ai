import { Position, Toaster } from "@blueprintjs/core";
import { StageTimeWrapper } from "meteor/empirica:core";
import React from "react";
import Slider from "./component/Slider";

const WarningToaster = Toaster.create({
  className: "warning-toaster",
  position: Position.TOP,
});

//timed button
const TimedButton = StageTimeWrapper((props) => {
  const { onClick, activateAt, remainingSeconds, stage } = props;

  const disabled = remainingSeconds > activateAt;
  return (
    <button
      type="button"
      className="btn-prediction-big"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled
        ? "Wait for " + Math.abs(remainingSeconds - activateAt) + "s"
        : stage.name === "outcome" || stage.name === "practice-outcome"
        ? "Next"
        : "Submit Prediction"}
    </button>
  );
});

export default class TaskResponse extends React.Component {
  handleChange = (num) => {
    const { player } = this.props;
    const prediction = Math.round(num * 100) / 100;

    player.round.set("prediction", prediction);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { player, stage } = this.props;
    const prediction = player.round.get("prediction");

    if (stage.name === "outcome" || stage.name === "outcome") {
      player.stage.submit();
      return;
    }
    if (prediction === null || prediction === undefined) {
      WarningToaster.show({ message: "Please make a prediction first." });
      return;
    } else {
      player.round.set("prediction", prediction);
      player.stage.submit();
      return;
    }
  };

  renderSlider(disabled) {
    return (
      <Slider
        onSlideChange={this.handleChange}
        disabled={disabled}
        {...this.props}
      />
    );
  }

  renderResult() {
    const { player, round, stage } = this.props;
    const task = round.get("task");

    const correct_answer = task.correct_answer === "Yes" ? 1 : 0;
    if (stage.get("type") === "feedback") {
      return (
        <div className="result">
          {correct_answer === 1 ? (
            <div className="alert">
              <div className="alert-content">
                <strong>Outcome</strong> The couple goes on a Second Date
              </div>
            </div>
          ) : (
            <div className="alert alert-error">
              <div className="alert-content">
                <strong>Outcome</strong> The couple didn’t get a Second Date
              </div>
            </div>
          )}
          <div className="result-score">
            <div className="result-item">
              <div className="result-entry label">Error</div>
              <div className="result-entry value">
                {player.round.get("prediction") !== null
                  ? Math.abs(
                      correct_answer - player.round.get("prediction")
                    ).toFixed(2)
                  : 1}
              </div>
            </div>
            <div className="result-item">
              <div className="result-entry label">Penalty</div>
              <div className="result-entry value">
                {player.round.get("prediction") !== null
                  ? Math.pow(
                      correct_answer - player.round.get("prediction"),
                      2
                    ).toFixed(2)
                  : 1}
              </div>
            </div>
            <div className="result-item last-item">
              <div className="result-entry label">Score</div>
              <div className="result-entry value">
                {player.round.get("score").toFixed(2) || 0}
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  renderSubmitted() {
    return (
      <div className="response">
        <h3> </h3>
        {this.renderSlider(true)}
        <button type="button" className="btn-prediction-big" disabled={true}>
          Submit Prediction
        </button>
      </div>
    );
  }

  render() {
    const { player, stage } = this.props;

    const isOutcome =
      stage.name === "outcome" || stage.name === "practice-outcome";

    // If the player already submitted, disabled the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }

    return (
      <div className="response">
        {!isOutcome && (
          <h3>
            Please review the profile above and predict whether this couple that
            met once would like to go on a second date.
          </h3>
        )}
        {this.renderSlider(isOutcome)}
        {this.renderResult()}
        <TimedButton
          stage={stage}
          player={player}
          activateAt={60}
          onClick={this.handleSubmit}
        />
      </div>
    );
  }
}
