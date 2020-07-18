import Slider from "meteor/empirica:slider";
import React from "react";
import SlidersPrediction from "./component/Slider";
import BodyDescription from "./ContentRight/BodyDescription";
import GlobalBars from "./ContentRight/GlobalBars";
import LocalBars from "./ContentRight/LocalBars";

export default class SocialExposure extends React.Component {
  renderSocialInteraction(otherPlayer) {
    const value = otherPlayer.round.get("value");
    return (
      <div className="alter" key={otherPlayer._id}>
        <img src={otherPlayer.get("avatar")} className="profile-avatar" />
        <div className="range">
          <Slider
            min={0}
            max={1}
            stepSize={0.01}
            labelStepSize={0.25}
            value={value}
            disabled
            hideHandleOnEmpty
          />
        </div>
      </div>
    );
  }

  render() {
    const { stage } = this.props;
    return (
      <>
        <SlidersPrediction disabled={true} {...this.props} />
        <BodyDescription
          isGlobal={stage.get("interpretationType") === "Global"}
        />
        {stage.get("interpretationType") === "Global" ? (
          <GlobalBars {...this.props} />
        ) : (
          <LocalBars {...this.props} />
        )}
      </>
    );
  }
}
