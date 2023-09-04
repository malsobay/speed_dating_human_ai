import React from "react";

import PlayerProfile from "./PlayerProfile.jsx";
import TaskStimulus from "./TaskStimulus.jsx";
import TaskResponse from "./TaskResponse.jsx";

import ContentRight from "./ContentRight";
import Instruction from "./component/Instruction.jsx";
import { Chat } from "@empirica/chat";
import { StageTimeWrapper } from "meteor/empirica:core";
import IdleToast from "./component/Idle.jsx";
import Slider from "./component/SocialInfoSlider.jsx";


//timed button
const TimedButton = StageTimeWrapper((props) => {
  const { onClick, activateAt, remainingSeconds, stage} = props;

  const disabled = remainingSeconds > activateAt;
  return (
    <button
      type="button"
      className="btn-prediction-big"
      onClick={onClick}
      disabled={disabled}
      style={{width:"400px"}}
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
          Please wait for other players...
        </button>
    );
  }

  renderSocialInteraction(otherPlayer) {
    const { game } = this.props;
    const socialInfoMode = game.treatment.socialInfoMode || "None";
    const meanWoA = _.mean(otherPlayer.get("woaHistory")).toFixed(2); 
    const meanWoALabel = meanWoA < 0 ? "Contradicting" : meanWoA <= 1 ? "Moderately reliant" : "Highly reliant";
    return (
      <div>
        <br/>
        <div style={{display:"flex", columnGap:"1rem"}}>
          <img src={otherPlayer.get("avatar")} height="50rem"/>
          
          <div>
            <span style={{color:otherPlayer.get("nameColor")}}><strong>{otherPlayer.get("name")}</strong></span>
            {socialInfoMode == "statusIndicators" && 
            <>
            <p><strong>Reliance:</strong> {meanWoALabel}</p>
            <p><strong>Score:</strong> {otherPlayer.get("cumulativeScore").toFixed(2)}</p>
            </>
            }
          </div>

        </div>
      </div>
    );
  }

  renderSocialInteractionSlider(otherPlayer) {
    const { game, player } = this.props;
    const socialInfoMode = game.treatment.socialInfoMode || "None";
    const previousPredictionSet = otherPlayer.get("predHistory").slice(-1)[0];
    const showScore = game.treatment.giveFeedback; 
    const playerIsSelf = player === otherPlayer; 
    const playerWoA = player.get("woaHistory").slice(-1)[0];
    const otherPlayerWoA = otherPlayer.get("woaHistory").slice(-1)[0];
    const similarWoA = Math.abs(playerWoA - otherPlayerWoA) < 0.1;
    
    return (
      <div>
    <div style={{display: "flex", columnGap: "0.5rem", alignItems: "center"}}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <span style={{color: otherPlayer.get("nameColor")}}><strong>{playerIsSelf ? "YOU" : otherPlayer.get("name")}</strong></span>
            <img src={otherPlayer.get("avatar")} height="50rem"/>
            {showScore && <center><h3>Score: {previousPredictionSet.score.toFixed(2)}</h3></center>}
        </div>

        {socialInfoMode === "statusIndicators" && 
        <div className="response">
            <Slider
                onSlideChange={() => null}
                disabled={true}
                focalPlayer={otherPlayer}
                {...this.props}
            />
            <br/>
            <br/>
            <br/>
            {!playerIsSelf && <center><h3>{otherPlayer.get("name")} relied on the AI's predictions <u>{similarWoA ? "to a degree similar to yours" : playerWoA >= otherPlayerWoA ? "less than you did":"more than you did"}</u> on the previous task.</h3></center>}
            {/* {<center><p>WoA: {otherPlayerWoA}</p></center>} */}
        </div>
        }
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
      <main className={`main-container ${single ? "single-column" : ""}`}
            onMouseDown={_.throttle(function(){
              player.set("lastInteraction", new Date(Tracker.nonreactive(TimeSync.serverTime)).valueOf())
            }, 1000)}
      >
        {<IdleToast {...this.props} />}
        
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

  renderIndicatorSocialInfo() {
    const { round, stage, player, game} = this.props;
    let otherPlayers = _.reject(game.players, p => p._id === player._id);
    otherPlayers = _.reject(otherPlayers, p => p.get("exited"));
    const socialInfoMode = game.treatment.socialInfoMode || "None";
    const submissionDelay = 5;
    const socialInfoTrigger = game.treatment.socialInfoDuration - submissionDelay;
    const showScore = game.treatment.giveFeedback;

    return (
      <main className={`main-container ${"single-column"}`}
            onMouseDown={_.throttle(function(){
              player.set("lastInteraction", new Date(Tracker.nonreactive(TimeSync.serverTime)).valueOf())
            }, 1000)}
            onKeyDown={_.throttle(function(){
              player.set("lastInteraction", new Date(Tracker.nonreactive(TimeSync.serverTime)).valueOf())
            }, 5000)}
      >
        {<IdleToast {...this.props} />}

        <header className="header-left">
          <PlayerProfile
            player={player}
            stage={stage}
            game={game}
            round={round}
          />
        </header>
        <section className="socialinfo-container">
          <h2>Below, you are shown how you and your group members utilized the AI's advice on the previous task{showScore ? ", as well as the score each of you received." : "."} Please scroll to the end to proceed.</h2>
          <div style={{display: "flex", justifyContent: "center"}}>
            <div className = "socialcard" style={{display: "flex-column", justifyContent: "center"}}>
              
              {/* {otherPlayers.map(p => this.renderSocialInteraction(p))} */}
              {this.renderSocialInteractionSlider(player)}
              {otherPlayers.map(p => this.renderSocialInteractionSlider(p))}
            </div>
            {/* <img src="reliance_levels.png" style={{maxWidth: "60%"}}></img> */}
          </div>
          <br/>
          <div style={{display: "flex", justifyContent: "center"}}>
            {player.stage.submitted ? this.renderSubmitted() : <button type="button" className="btn-prediction-big" onClick={player.stage.submit}>Proceed</button>}
          </div>
          <br/>
        </section>
        
        
      </main>
  )
  }

  renderChatSocialInfo() {
    const { round, stage, player, game} = this.props;
    let otherPlayers = _.reject(game.players, p => p._id === player._id);
    otherPlayers = _.reject(otherPlayers, p => p.get("exited"));
    const socialInfoMode = game.treatment.socialInfoMode || "None";
    const submissionDelay = 20;
    const socialInfoTrigger = game.treatment.socialInfoDuration - submissionDelay;

    return (
      <main className={`main-container ${"single-column"}`}
            onMouseDown={_.throttle(function(){
              player.set("lastInteraction", new Date(Tracker.nonreactive(TimeSync.serverTime)).valueOf())
            }, 1000)}
            onKeyDown={_.throttle(function(){
              player.set("lastInteraction", new Date(Tracker.nonreactive(TimeSync.serverTime)).valueOf())
            }, 5000)}
      >
      {<IdleToast {...this.props} />}

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
          <p className="chat-title"><strong>Discuss how to best utilize the AI's predictions in making your own predictions</strong></p>
          <Chat player={player} scope={round} />
        </section>
        <div></div>
        
        <div className="social-exposure" style={{float:'left', flex:1}}>
          <h3>You are <span style={{color:player.get("nameColor")}}>{player.get("name")}</span> </h3>
          <p><strong>There are {otherPlayers.length} other players:</strong></p>
          {otherPlayers.map(p => this.renderSocialInteraction(p))}
          <br/>
          {player.stage.submitted ? this.renderSubmitted() : <TimedButton stage={stage} player={player} activateAt={socialInfoTrigger} onClick={player.stage.submit}
      />}
        </div>
       
      </section>
      

    </main>
    )
  }

  render() {
    const { round, stage, player, game} = this.props;
    const socialInfoMode = game.treatment.socialInfoMode || "None";
    console.log(stage.name, socialInfoMode)

    if(stage.name == "socialInfo" & socialInfoMode == "statusIndicators"){
      return this.renderIndicatorSocialInfo();
      };

    if(stage.name == "socialInfo" & socialInfoMode == "chat"){
      return this.renderChatSocialInfo();};

    return round.get("case") === "instruction"
      ? this.renderInstructions()
      : this.renderRound();
  }
}
