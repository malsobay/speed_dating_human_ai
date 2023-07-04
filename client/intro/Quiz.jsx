import React from "react";
import Radio from "./Radio";

import { Centered } from "meteor/empirica:core";

export default class Quiz extends React.Component {
  state = { sum: "", answer: "", answer2: ""};

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({[el.name]: el.value.trim().toLowerCase()});
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.sum !== "10" || this.state.answer !== "b" || this.state.answer2 !== "d") {
      alert("One or more answers is incorrect; please review the instructions and try again.");
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    const { sum, answer, answer2} = this.state;
    return (
      <Centered>
        <div className="quiz">
          <h1> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
            <p>
              <label htmlFor="sum">
                <h3>How many different dates will you have to predict in this task?</h3>
              </label>
              <input
                type="text"
                dir="auto"
                id="sum"
                name="sum"
                placeholder="e.g. 3"
                value={sum}
                onChange={this.handleChange}
                autoComplete="off"
                required
              />
            </p>
            <h3>For each couple, you will have two steps: Step 1, and Step 2. Please confirm that you understand the steps by answering the following:</h3>
            <div>
              <ol className="question">
                <li>
                  <p>
                    In Step 1, you will look at information about a couple that
                    met through speed dating and make a prediction about:
                  </p>
                  <div>
                    <Radio
                      selected={answer}
                      name="answer"
                      value="a"
                      option="a"
                      label="When the couple met"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <Radio
                      selected={answer}
                      name="answer"
                      value="b"
                      option="b"
                      label="How likely the couple is to go on a second date"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <Radio
                      selected={answer}
                      name="answer"
                      value="c"
                      option="c"
                      label="How long the couple has been dating"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <Radio
                      selected={answer}
                      name="answer"
                      value="d"
                      option="d"
                      label="None of the above"
                      onChange={this.handleChange}
                    />
                  </div>
                </li>
                <li>
                  <p>In Step 2, you will:</p>
                  <div>
                    <Radio
                      selected={answer2}
                      name="answer2"
                      value="a"
                      option="a"
                      label="Receive predictions made by an AI system"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <Radio
                      selected={answer2}
                      name="answer2"
                      value="b"
                      option="b"
                      label="Receive predictions made by other people"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <Radio
                      selected={answer2}
                      name="answer2"
                      value="c"
                      option="c"
                      label="Have a chance to revise your initial predictions from Step 1"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <Radio
                      selected={answer2}
                      name="answer2"
                      value="d"
                      option="d"
                      label="Both a and c"
                      onChange={this.handleChange}
                    />
                  </div>
                </li>
              </ol>
            </div>

            <p>
              <button type="button" onClick={onPrev} disabled={!hasPrev}>
                Back to instructions
              </button>
              <button type="submit">Submit</button>
            </p>
          </form>
        </div>
      </Centered>
    );
  }
}
