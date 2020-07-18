import React from "react";

import SocialExposure from "../SocialExposure.jsx";
// import TaskFeedback from "../TaskFeedback.jsx";

export default class BodyRight extends React.Component {
  render() {
    const { stage, player, game, round } = this.props;
    return (
      <section className="content-right">
        {stage.get("type") === "social" || stage.get("type") === "feedback" ? (
          <SocialExposure stage={stage} player={player} game={game} round={round} />
        ) : null}
      </section>
    );
  }
}
