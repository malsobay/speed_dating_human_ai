import React from "react";

import PlayerProfile from "./PlayerProfile.jsx";
import TaskStimulus from "./TaskStimulus.jsx";
import TaskResponse from "./TaskResponse.jsx";

import ContentRight from "./ContentRight";
import Instruction from "./component/Instruction.jsx";
import { Chat } from "@empirica/chat";
import { StageTimeWrapper } from "meteor/empirica:core";

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
        ? "I'm ready to end discussion and continue. (Enabled after " + Math.abs(remainingSeconds - activateAt) + "s)"
        : "I'm ready to end discussion and continue."}
    </button>
  );
});

export default class Round extends React.Component {  
  
  renderSubmitted() {
    return (
        <button type="button" className="btn-prediction-big" disabled={true}>
          Other players are still discussing...
        </button>
    );
  }

  renderSocialInteraction(otherPlayer) {
  
    return (
      <div>
        <br/>
        <div style={{display:"flex", columnGap:"1rem"}}>
          <img src={otherPlayer.get("avatar")} height="50rem"/>
          
          <div>
            <span style={{color:otherPlayer.get("nameColor")}}><strong>{otherPlayer.get("name")}</strong></span>
            {/* <p>Score: {otherPlayer.get("score")}</p> */}
          </div>

        </div>
      </div>
    );
  }

  renderRound() {
    const { round, stage, player, game } = this.props;
    const single =
      (stage.get("type") !== "social" && stage.get("type") !== "feedback") ||
      stage.get("interpretationType") === "None";

    return (
      <main className={`main-container ${single ? "single-column" : ""}`}>
        <header className="header-left">
          <PlayerProfile
            player={player}
            stage={stage}
            game={game}
            round={round}
          />
        </header>

        <section className="content-left">
          <div className="couples-card">
            <TaskStimulus {...this.props} />
            <TaskResponse {...this.props} />
          </div>
        </section>

        {!single && <ContentRight {...this.props} />}
      </main>
    );
  }
  renderInstructions() {
    return (
      <main className={`main-container  single-column`}>
        <header className="header-left"> </header>

        <section className="content-left">
          <div className="couples-card small">
            <div className="response">
              <div className="instructions">
                <h1 className={"bp3-heading"}>
                  Instructions - Interactive Round
                </h1>
                <Instruction {...this.props} />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
  render() {
    const { round, stage, player, game} = this.props;
    const otherPlayers = _.reject(game.players, p => p._id === player._id);

    if(stage.name == "discussion"){
      return (
        <main className={`main-container ${"single-column"}`}>
        <header className="header-left">
          <PlayerProfile
            player={player}
            stage={stage}
            game={game}
            round={round}
          />
        </header>


        <section className="discussion-container">
          <section className="chat-container" style={{flex: 2}}>
            <p className="chat-title"><strong>Feel free to discuss the task with your group</strong></p>
            <Chat player={player} scope={round} />
          </section>
          <div></div>
          
          <div className="social-exposure" style={{float:'left', flex:1}}>
            <h3>You are <span style={{color:player.get("nameColor")}}>{player.get("name")}</span> </h3>
            <p><strong>There are {otherPlayers.length} other players:</strong></p>
            {otherPlayers.map(p => this.renderSocialInteraction(p))}
            <br/>
            {player.stage.submitted ? this.renderSubmitted() : <TimedButton stage={stage} player={player} activateAt={240 - 90} onClick={player.stage.submit}
        />}
          </div>
         
        </section>
        

      </main>
      );
    }
    return round.get("case") === "instruction"
      ? this.renderInstructions()
      : this.renderRound();
  }
}
