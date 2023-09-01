import React from "react";

// import modelGlobalJson_highAcc from "../../model_global_highAcc.json";
// import modelGlobalJson_lowAcc from "../../model_global_lowAcc.json";
import modelGlobalJson_default from "../../model_global.json";

export default class GlobalBars extends React.Component {
  renderBar = (maxValue, { title, value, gender }) => {
    let formattedValue = value * 100;
    formattedValue = formattedValue > 1 ?  Math.round(formattedValue.toFixed(2)) : formattedValue.toFixed(2);
    return (
    <div key={title} className="relative-bar-container">
        <div className={`bar ${gender}`} style={{ width: `${(value / maxValue) * 200}px` }}></div>
        <div className="label">
          {title} {formattedValue}%
        </div>
      </div>
    );
  };

  render() {
    const {game} = this.props;
    const modelAccuracy = game.treatment.modelAccuracy;
    // const modelGlobalJson = modelAccuracy == "high" ? modelGlobalJson_highAcc : modelAccuracy == "low" ? modelGlobalJson_lowAcc : modelGlobalJson_default;
    const modelGlobalJson = modelGlobalJson_default;
    const values = modelGlobalJson.map((m) => m.value);
    const maxValue = Math.max(...values);
    return (
      <div className="bars-prediction">
        {modelGlobalJson.map((p) => this.renderBar(maxValue, p))}
      </div>
    );
  }
}
