import React from "react";
import { BAR_COLORS } from "../../constants/colors";
import modelLocalJson from "../../model_local.json";

import modelLocalJson_highAcc from "../../model_local_highAcc.json";
import modelLocalJson_lowAcc from "../../model_local_lowAcc.json";

export default class LocalBars extends React.Component {
  renderLines = ({ numbefOfLines, minValue, maxValue, step }) => {
    const Line = ({ left, label }) => {
      let leftLabel = label > -10 ? 177 : 170;
      return (
        <>
          <div className="line" style={{ left: `${left + 180}px` }}></div>
          <span
            className="line-label"
            style={{ left: `${left + leftLabel}px` }}
          >
            {label}
          </span>
        </>
      );
    };

    let currentLabel = minValue;

    return (
      <>
        <div className="top-label" style={{ right: "120px" }}>
          Improved Chances
        </div>
        {Array(numbefOfLines)
          .fill(null)
          .map((el, i) => {
            if (i !== 0) {
              currentLabel += step;
            }
            return (
              <Line
                key={i}
                left={(420 / numbefOfLines) * i}
                label={currentLabel}
              />
            );
          })}
        <div className="bottom-label" style={{ right: "230px" }}>
          Hurt Chances
        </div>
      </>
    );
  };

  renderBarTextContent = (data) => {
    return (
      <div className="bar-text-content">
        {data.map((d, i) => (
          <span key={i} className="text">
            {d.condition}
          </span>
        ))}
      </div>
    );
  };

  renderBars = (data) => {
    const total = data.reduce((cur, next) => {
      return cur + next.value;
    }, 0);

    const Bar = ({ isPositive, width }) => {
      const backgroundColor = isPositive
        ? BAR_COLORS[`GREEN_${Math.ceil(width / 40)}`]
        : BAR_COLORS[`RED_${Math.ceil(width / 40)}`];

      let styleObj = { width: `${width}px`, backgroundColor };

      styleObj = isPositive
        ? { ...styleObj, left: "190px" }
        : { ...styleObj, left: `${190 - width}px` };
      return <div className="bar" style={styleObj}></div>;
    };

    return data.map(({ value, condition }) => {
      const isPositive = value > 0;
      const width = 7.5 * Math.abs(value);
      return <Bar key={condition} isPositive={isPositive} width={width} />;
    });
  };

  render() {
    const { round, game} = this.props;
    const modelAccuracy = game.treatment.modelAccuracy;
    const modelLocalJson = modelAccuracy == "high" ? modelLocalJson_highAcc : modelLocalJson_lowAcc;
    const task = round.get("task");
    const { data } = modelLocalJson.find((m) => m._id === task._id);
    data.sort((a, b) => {
      return b.value - a.value;
    });
    return (
      <div className="graph-wrapper">
        <div className="graph">
          {this.renderBarTextContent(data)}
          <div className="bar-lines-container">
            {this.renderBars(data)}
            {this.renderLines({
              numbefOfLines: 11,
              step: 5,
              maxValue: 25,
              minValue: -25,
            })}
          </div>
        </div>
      </div>
    );
  }
}
