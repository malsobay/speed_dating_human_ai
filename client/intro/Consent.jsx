import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";

export default class Consent extends React.Component {
  render() {
    return (
      <Centered>
        <div className="consent">
          <h1 className="bp3-heading"> Consent Form </h1>
          <p className="bp3-ui-text">
          This experiment is part of a MIT scientific project. Your decision to participate
          in this experiment is entirely voluntary. There are no known or anticipated risks 
          to participating in this experiment. There is no way for us to identify you. The only 
          information we will have, in addition to your responses, is the timestamps of your 
          interactions with our site. The results of our research may be presented at scientific 
          meetings or published in scientific journals. Clicking on the "AGREE" button indicates 
          that you are at least 18 years of age, and agree to participate voluntarily.
          </p>
          <br/>
          <ConsentButton text="I AGREE"/>
        </div>
      </Centered>
    );
  }
}
