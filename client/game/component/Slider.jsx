/**
 * Spare slider component
 * To make this reuse for other component
 */
import Slider from "meteor/empirica:slider";
import React from "react";

export default (props) => {
  handleChange = (num) => {
    onSlideChange(num);
  };

  const { player, round, stage, onSlideChange, disabled } = props;

  let value = player.round.get("prediction");

  const predictionProb =
    round.get("model_prediction_prob") ||
    round.get("task").model_prediction_prob;

  const effectiveIndex = round.get("effectiveIndex");
  const predictionPrefix = round.get("practice")
    ? "prediction-practice"
    : "prediction";

  const isSolo = stage.get("type") === "solo";
  const isSocial = stage.get("type") === "social";
  const initialPrediction = player.get(`${predictionPrefix}-${effectiveIndex}`);
  const isOutcome =
    stage.name === "outcome" || stage.name === "practice-outcome";
  const newPrediction = !disabled && stage.get("type") === "social";

  stage.name === "outcome" || stage.name === "practice-outcome";
  const aiPrediction = (!isSolo && predictionProb) || null;
  const userPrediction =
    isSocial && initialPrediction !== null && initialPrediction !== undefined
      ? initialPrediction
      : null;
  const userFinalPrediction =
    isOutcome && value !== null && value !== undefined ? value : null;

  const aiPercentage = aiPrediction * 100;
  const userPercentage = userPrediction * 100;
  const finalUserPercentage = userFinalPrediction * 100;
  const newPredictPercentage = value * 100;

  return (
    <div className="slider">
      <div className="slider-component slider-component-label">
        <div className="slider-percentage-row">
          <div className="slider-percentage-label slider-label">
            <span>0%</span>
          </div>
          <div className="slider-percentage-label slider-label">
            <span>25%</span>
          </div>
          <div className="slider-percentage-label slider-label">
            <span>50%</span>
          </div>
          <div className="slider-percentage-label slider-label">
            <span>75%</span>
          </div>
          <div className="slider-percentage-label slider-label">
            <span>100%</span>
          </div>
        </div>
      </div>
      <div className="slider-component">
        <Slider
          className={`task-response-slider${disabled ? " no-handle" : ""}`}
          min={0}
          max={1}
          stepSize={0.01}
          labelStepSize={0.25}
          onChange={handleChange}
          disabled={disabled}
          value={value}
          labelRenderer={(number) => {
            return number.toFixed(2).toString();
          }}
          hideHandleOnEmpty
        />
        {aiPrediction !== null && aiPrediction !== undefined && (
          <div
            className="prediction ai"
            style={{ left: `calc(${aiPercentage}% - 6.5px)` }}
          >
            <div className="prediction-content">
              <div className="prediction-point" />
              <div className="prediction-line" />
              <div className="prediction-box">
                AI Prediction: {Math.round(aiPercentage)}%
              </div>
            </div>
          </div>
        )}
        {disabled && !userFinalPrediction
          ? userPrediction !== null &&
            userPrediction !== undefined && (
              <div
                className="prediction user"
                style={{ left: `calc(${userPercentage}% - 6.5px)` }}
              >
                <div className="prediction-content">
                  <div className="prediction-point" />
                  <div className="prediction-line" />
                  <div className="prediction-box">
                    Your previous prediction: {Math.round(userPercentage)}%
                  </div>
                </div>
              </div>
            )
          : userPrediction !== null &&
            userPrediction !== undefined &&
            !userFinalPrediction && (
              <div
                className="prediction user"
                style={{ left: `calc(${userPercentage}% - 6.5px)` }}
              >
                <div className="prediction-content">
                  <div className="prediction-point" />
                  <div className="prediction-line" />
                  <div className="prediction-box">
                    Your previous prediction: {Math.round(userPercentage)}%
                  </div>
                </div>
              </div>
            )}
        {userFinalPrediction !== null && userFinalPrediction !== undefined && (
          <div
            className="prediction user"
            style={{
              left: `calc(${finalUserPercentage}% - ${
                userFinalPrediction == 1 ? "1px" : "6.5px"
              })`,
            }}
          >
            <div className="prediction-content">
              <div className="prediction-point" />
              <div className="prediction-line" />
              <div className="prediction-box">
                Your final prediction: {Math.round(finalUserPercentage)}%
              </div>
            </div>
          </div>
        )}
        {newPrediction && value !== null && value !== undefined && (
          <div
            className="prediction new-prediction"
            style={{ left: `calc(${newPredictPercentage}% - 6.5px)` }}
          >
            <div className="prediction-content">
              <div className="prediction-box">Your New Prediction</div>
              <div className="prediction-line" />
              <div className="prediction-point" />
            </div>
          </div>
        )}
      </div>
      <div className="slider-component slider-component-text">
        <div className="slider-text-row">
          <div className="slider-text-label slider-label">
            <span>
              Very unlikely
              <br />
              to date again
            </span>
          </div>
          <div className="slider-text-label slider-label">
            <span>
              Unlikely to <br />
              date again
            </span>
          </div>
          <div className="slider-text-label slider-label">
            <span>
              Neither likely
              <br />
              nor unlikely
            </span>
          </div>
          <div className="slider-text-label slider-label">
            <span>
              Likely to
              <br />
              date again
            </span>
          </div>
          <div className="slider-text-label slider-label">
            <span>
              Very likely
              <br />
              to date again
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
