import React from "react";

import { Centered } from "meteor/empirica:core";

export default class InstructionStepOne extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
      <Centered className="with-topper">
        <div className="instructions">
          <h1 className={"bp3-heading"}>Instructions (Part 1)</h1>
          <p>
            In this experiment, you will play an online prediction game. The
            game involves predicting whether specific couples that met through
            speed dating will want to pursue a second date. The game will take
            you about 10 minutes and consists of two steps which are described
            below:
          </p>
          <h3>
            <u>Step 1:</u>
          </h3>
          <p>
            In step 1, you will be provided with information about a specific
            couple’s initial speed dating meeting and be asked to guess how
            likely this couple is to want a second date. You will do this for 10
            different couples. For each couple, you will be presented with the
            slider scale shown below, where you can choose your prediction from
            0% (very unlikely to date again) to 100% (very likely to data
            again).
          </p>

          <div className="slider-image">
            <img src="/slider.svg" alt="Slider intro" />
          </div>
          <p>
            The information you receive about each couple’s initial speed dating
            meeting will be presented to you in a chart. An example of this
            chart is shown below, along with descriptions of the three types of
            information the chart contains.
          </p>

          <div className="intro-flex">
            <div className="intro-column-65">
              <img src="/first-date-information.svg" alt="first information" />
            </div>
            <div className="intro-column-35">
              <p>
                1 - <u>Demographic Information</u>: The age and race of the man
                and woman in each couple.
              </p>

              <p>
                2 - <u>The couple’s ratings of each other</u>: When the couples
                initially met, they rated each other on six attributes
                (attractiveness, sincerity, intelligence, fun, ambition, &
                shared interests). Each rating will range from 0 to 10. For
                example, if the man’s Ambition score is 10, it means the woman
                gave him the highest rating on the attribute of ambition.
              </p>

              <p>
                3 - <u>The “interest correlation”</u>: Each man and each woman
                also filled out a questionnaire about themselves. For each
                couple, the similarity between the man and the woman’s interests
                (sports, food, hobbies, etc.) was calculated and is presented as
                the interest correlation score. This score ranges from -1 to 1,
                where -1 means the couple’s interests are most dissimilar, 1
                means their interests are most similar, and 0 means they have no
                common interests.
              </p>
            </div>
          </div>

          <h3>
            <u>Step 2:</u>
          </h3>
          <p>
            In step 2, you will be presented with the predictions of an
            Artificial Intelligence (AI) system for each of the same 10 couples
            that you made predictions for in step 1. In this step, you can
            modify the predictions you made in step 1. You will submit your new
            predictions using a slider scale just like what you used previously.
            If you do not want to modify your previous forecast, you can submit
            the same results you submitted in step 1 (which will be shown to
            you). More details about step 2 will be provided when you get to
            that part of the experiment.
          </p>
          <h3>
            <u>Scoring:</u>
          </h3>
          <p>
            At the end of the experiment, you will get points based on the
            accuracy of your step 2 predictions (the predictions you made after
            receiving the AI system’s predictions). Please note that the largest
            portion of your pay is dependent on the accuracy of your step 2
            predictions (more accurate predictions mean higher scores, and
            therefore greater payment for this game).
          </p>

          {/* <p>
            {game.treatment.playerCount > 1 ? " In step 1, y" : "Y"}
            ou will be asked to guess whether or not a couple will want to date
            each other again given the demographics of participants and their
            ratings of each other. To be more specific,{" "}
            <strong>
              you will predict the probability of success (i.e., probability
              that a couple will want to date each other) for{" "}
              {game.treatment.roundCount} different dates.
            </strong>
          </p> */}

          {/* {game.treatment.playerCount > 1 ? (
            <p>
              In step 2, you will be provided with predictions of an A.I. system
              for the same cases you reviewed in step 1. In this step, you can
              decide whether or not to modify the predictions made in step 1. If
              you do not want to modify your previous forecast, please submit
              the same results as in step 1.
            </p>
          ) : null} */}

          {/* <p>
            At the end of the experiment, you will get points based on the
            accuracy of your final prediction{" "}
            {game.treatment.playerCount > 1
              ? "i.e., after you have received the AI recommendation"
              : "."}{" "}
            Note that the biggest portion of your pay is dependent on your
            performance (i.e., accuracy) in this task.
          </p>

          <p>
            <span style={{ color: "red" }}>
              <strong>
                The more accurate your prediction, the higher your score and
                therefore greater your payout in this game.
              </strong>
              .
            </span>
          </p>

          <p>
            Now let's take part in the game, get high scores, and beat other
            players
            {game.treatment.playerCount > 1 ? "and even A.I." : "."}{" "}
          </p> */}

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
