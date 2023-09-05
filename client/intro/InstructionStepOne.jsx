import React from "react";

import { Centered } from "meteor/empirica:core";

export default class InstructionStepOne extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
      <Centered className="with-topper">
        <div className="instructions">
          <h1 className={"bp3-heading"}>General Instructions</h1>
          <p>
            In this experiment, you will play an online prediction game. The
            game involves predicting whether specific heterosexual couples that met through
            speed dating will want to pursue a second date. 
            <strong>The game consists of 10 rounds, each representing a different couple; the total time available to you at each stage is shown in a countdown at the top of the screen.</strong> 
          </p>
          <h2>Each round will have the following steps:</h2>
          <h3>
            <u>Step 1:</u>
          </h3>
          <p>
            In Step 1, you will be provided with information about a specific
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
            In Step 2, you will be presented with the predictions of an
            Artificial Intelligence (AI) system for the same couple presented in Step 1. 
            In this step, you can modify the predictions you made in Step 1. You will submit your new
            predictions using a slider scale just like what you used previously.
            If you do not want to modify your previous forecast, you can submit
            the same results you submitted in Step 1 (which will be shown to
            you). More details about Step 2 will be shown next.
          </p>
          

          {/* {game.treatment.playerCount > 1 && 
          <div>
            <h3>
              <u>Discussion:</u>
            </h3>
          <p>
            You are simultaneously playing this game with {game.treatment.playerCount - 1} other participants. 
            Occasionally, you may have the opportunity to <strong>discuss the game with the other participants via a chat window.</strong> 
             Feel free to discuss anything related to the game, such as your strategies, or the AI's predictions, etc...
          </p>
          </div>
          } */}
          
          <h3>
            <u>Scoring:</u>
          </h3>
          <p><strong>{game.treatment.giveFeedback ? "After you submit your final prediction in Step 2, you will be shown your score for that couple, and your cumulative score will always be shown in the top right corner of your screen.":""}</strong></p>
          <p><strong>Accuracy is defined by how close your prediction is to the correct answer (the correct answer is 0 if the couple did not go on a second date, and 1 if they did).</strong></p>
          <p>
            At the end of the experiment, you will receive a bonus based on the
            accuracy of all of your Step 2 predictions (the predictions you made after
            receiving the AI system’s predictions). Please note that the largest portion of your pay is dependent on the accuracy of your Step 2
            predictions (more accurate predictions mean higher scores, and
            therefore greater payment for this game).
          </p>
          <p><strong>{game.treatment.playerCount > 1 ? "You are judged only on your own predictions, not those of any other player.":""}</strong></p>

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
