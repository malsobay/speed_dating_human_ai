import Empirica from "meteor/empirica:core";

import "./callbacks.js";
import "./bots.js";

import data from "./experiment_data/task_data";

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.

let questionText =
  "Please review the profile below and predict whether they would like to date again.";

// {
//     "Classes": "Introduction",
//     "_id": 1049,
//     "correct_answer": "Yes",
//     "model_prediction": "Yes",
//     "model_prediction_prob": 0.7641131281852722,
//     "features": {
//       "Interests Correlation": 0.08,
//       "Woman's Race": "European/Caucasian-American",
//       "Woman's Age": 21.0,
//       "Woman's Attractive": 8.0,
//       "Woman's Sincere": 5.0,
//       "Woman's Intelligent": 5.0,
//       "Woman's Fun": 7.0,
//       "Woman's Ambitious": 7.0,
//       "Woman's SharedInterests": 9.0,
//       "Man's Race": "European/Caucasian-American",
//       "Man's Age": 23.0,
//       "Man's Attractive": 6.0,
//       "Man's Sincere": 8.0,
//       "Man's Intelligent": 6.0,
//       "Man's Fun": 8.0,
//       "Man's Ambitious": 10.0,
//       "Man's SharedInterests": 10.0,
//       "Same Race": "Yes"
//     },
//     "model_global_explination": "/task/tasks/global.png",
//     "model_local_explination": "/task/tasks/1049.png"
//   },

let practiceData = [
  // {
  //   Classes: "Introduction",
  //   _id: 1049,
  //   correct_answer: "Yes",
  //   model_prediction: "Yes",
  //   model_prediction_prob: 0.7641131281852722,
  //   features: {
  //     InterestsCorr: 0.08,
  //     Gender: "Woman",
  //     Race: "European/Caucasian-American",
  //     Age: 21.0,
  //     Attractive: 8.0,
  //     Sincere: 5.0,
  //     Intelligent: 5.0,
  //     Fun: 7.0,
  //     Ambitious: 7.0,
  //     SharedInterests: 9.0,
  //     Gender_Partner: "Man",
  //     Race_Partner: "European/Caucasian-American",
  //     Age_Partner: 23.0,
  //     Attractive_Partner: 6.0,
  //     Sincere_Partner: 8.0,
  //     Intelligent_Partner: 6.0,
  //     Fun_Partner: 8.0,
  //     Ambitious_Partner: 10.0,
  //     SharedInterests_Partner: 10.0
  //   },
  //   model_global_explination: "/task/tasks/global.png",
  //   model_local_explination: "/task/tasks/1049.png"
  // },
  {
    Classes: "Pratice",
    _id: 853,
    correct_answer: "No",
    model_prediction: "No",
    model_prediction_prob: 0.31700220704078674,
    features: {
      InterestsCorr: 0.22,
      Gender: "Woman",
      Race: "Black/African American",
      Age: 26.0,
      Attractive: 9.0,
      Sincere: 9.0,
      Intelligent: 9.0,
      Fun: 4.0,
      Ambition: 10.0,
      SharedInterests: 3.0,
      Gender_Partner: "Man",
      Race_Partner: "Latino/Hispanic American",
      Age_Partner: 28.0,
      Attractive_Partner: 4.0,
      Sincere_Partner: 8.0,
      Intelligent_Partner: 8.0,
      Fun_Partner: 8.0,
      Ambition_Partner: 7.0,
      SharedInterests_Partner: 5.0,
    },
    model_global_explination: "/task/tasks/global.png",
    model_local_explination: "/task/tasks/853.png",
  },
  {
    Classes: "Practice",
    _id: 1202,
    correct_answer: "Yes",
    model_prediction: "Yes",
    model_prediction_prob: 0.902144730091095,
    features: {
      InterestsCorr: 0.05,
      Gender: "Woman",
      Race: "Other",
      Age: 23.0,
      Attractive: 7.0,
      Sincere: 8.0,
      Intelligent: 7.0,
      Fun: 7.0,
      Ambitious: 5.0,
      SharedInterests: 7.0,
      Gender_Partner: "Man",
      Race_Partner: "European/Caucasian-American",
      Age_Partner: 25.0,
      Attractive_Partner: 9.0,
      Sincere_Partner: 8.0,
      Intelligent_Partner: 8.0,
      Fun_Partner: 9.0,
      Ambitious_Partner: 8.0,
      SharedInterests_Partner: 10.0,
    },
    model_global_explination: "/task/tasks/global.png",
    model_local_explination: "/task/tasks/1202.png",
  },
];

Empirica.gameInit((game) => {
  game.players.forEach((player, i) => {
    player.set("avatar", `/avatars/jdenticon/${player._id}`);
    player.set("score", 0);
  });

  const shuffledData = _.shuffle(data);

  const roundCount = game.treatment.roundCount || 10;
  const playerCount = game.treatment.playerCount || 1;
  const interpretationType = game.treatment.interpretationType || "None";
  const feedback = game.treatment.giveFeedback || false;
  const stageDuration = game.treatment.stageLength || 120;
  const socialStageDuration = game.treatment.socialStageLength || 120;
  // const stageDuration = 400;
  // const socialStageDuration = 400;

  // - 2 to add the two practice rounds and * 2  because for each task instance, we will do it once a lone, and then again with AI + feedback and the + 2 because we need that for the practice rounds too
  for (let i = -2; i < roundCount * 2 + 2 * 2; i++) {
    // the last + 1 is the number of instruction pages

    // the initial two practice rounds with only initial guesses
    if (i < 0) {
      const round = game.addRound({
        data: {
          task: practiceData[i + 2],
          practice: true,
          case: "initial",
          effectiveIndex: i + 3,
        },
      });
      round.addStage({
        name: "practice-initial",
        displayName: "Practice - Initial Prediction",
        durationInSeconds: stageDuration,
        data: {
          type: "solo",
          practice: true,
          questionText: questionText,
        },
      });
      continue;
    }
    //the start of the real game only initial guesses
    if (i >= 0 && i < roundCount) {
      const round = game.addRound({
        data: {
          task: shuffledData[i],
          practice: false,
          case: "initial",
          effectiveIndex: i + 1,
        },
      });
      round.addStage({
        name: "initial",
        displayName: "Initial Prediction",
        durationInSeconds: stageDuration,
        data: {
          type: "solo",
          practice: false,
          questionText: questionText,
        },
      });
      continue;
    }

    if (playerCount > 1) {
      // only if there is an AI
      //now instructions
      if (i === roundCount) {
        const round = game.addRound({
          data: {
            practice: false,
            case: "instruction",
            effectiveIndex: null,
          },
        });
        round.addStage({
          name: "instruction",
          displayName: "Instructions: Now you will revise",
          durationInSeconds: stageDuration + 100000,
          data: {
            instruction: true,
          },
        });
        continue;
      }

      ////now the practice round revision
      if (i > roundCount && i < roundCount + 3) {
        const round = game.addRound({
          data: {
            task: practiceData[i - roundCount - 1],
            practice: true,
            case: "revise",
            effectiveIndex: i - roundCount,
          },
        });
        round.addStage({
          name: "practice-social",
          displayName: "Practice - Revise Prediction",
          durationInSeconds: socialStageDuration,
          data: {
            type: "social",
            practice: true,
            questionText: questionText,
            interpretationType: interpretationType,
          },
        });

        if (feedback) {
          round.addStage({
            name: "practice-outcome",
            displayName: "Case Outcome",
            durationInSeconds: stageDuration,
            data: {
              type: "feedback",
              practice: false,
              interpretationType: interpretationType,
            },
          });
        }
        continue;
      }

      if (i > roundCount + 3) {
        const round = game.addRound({
          data: {
            task: shuffledData[i - (roundCount + 2 + 2)],
            practice: false,
            case: "revise", //whether revising the task
            effectiveIndex: i - (roundCount + 2 + 1), // the two practice + instruction page
          },
        });
        round.addStage({
          name: "social",
          displayName: "Interactive Prediction",
          durationInSeconds: socialStageDuration,
          data: {
            type: "social",
            practice: false,
            questionText: questionText,
            interpretationType: interpretationType,
          },
        });
        if (feedback) {
          round.addStage({
            name: "outcome",
            displayName: "Case Outcome",
            durationInSeconds: stageDuration,
            data: {
              type: "feedback",
              practice: false,
              interpretationType: interpretationType,
            },
          });
        }
      }
    }
  }
});

//
//
//
//
//
//
//
//
//     //the first 2 rounds are practice .. two rounds with initial guess
//
//     if (i > 0) {
//       const round = game.addRound({
//         data: {
//           task: practiceData,
//           practice: true,
//           case: "revise",
//           effectiveIndex: i + 3
//         }
//       });
//       round.addStage({
//         name: "practice-social",
//         displayName: "Practice - Revise Prediction",
//         durationInSeconds: socialStageDuration,
//         data: {
//           type: "social",
//           practice: true,
//           questionText: questionText,
//           interpretationType: interpretationType
//         }
//       });
//
//       if (feedback) {
//         round.addStage({
//           name: "practice-outcome",
//           displayName: "Case Outcome",
//           durationInSeconds: stageDuration,
//           data: {
//             type: "feedback",
//             practice: false
//           }
//         });
//       }
//     } else {
//       const round = game.addRound({
//         data: {
//           task: practiceData,
//           practice: true,
//           case: "initial",
//           effectiveIndex: i + 5
//         }
//       });
//       round.addStage({
//         name: "practice-initial",
//         displayName: "Initial Prediction",
//         durationInSeconds: stageDuration,
//         data: {
//           type: "solo",
//           practice: true,
//           questionText: questionText
//         }
//       });
//     }
//   } else {
//     // this is the actual game, not practice
//
//     if (i < game.treatment.roundCount) {
//       const round = game.addRound({
//         data: {
//           task: shuffledData[i],
//           practice: false,
//           case: "initial", //first time encountering the case
//           effectiveIndex: i + 1
//         }
//       });
//       round.addStage({
//         name: "initial",
//         displayName: "Initial Prediction",
//         durationInSeconds: stageDuration,
//         data: {
//           type: "solo",
//           practice: false,
//           questionText: questionText
//         }
//       });
//     } else {
//       const round = game.addRound({
//         data: {
//           task: shuffledData[i - game.treatment.roundCount],
//           practice: false,
//           case: "revise", //whether revising the task
//           effectiveIndex: i - game.treatment.roundCount + 1
//         }
//       });
//       round.addStage({
//         name: "social",
//         displayName: "Interactive Prediction",
//         durationInSeconds: socialStageDuration,
//         data: {
//           type: "social",
//           practice: false,
//           questionText: questionText,
//           interpretationType: interpretationType
//         }
//       });
//       if (feedback) {
//         round.addStage({
//           name: "outcome",
//           displayName: "Case Outcome",
//           durationInSeconds: stageDuration,
//           data: {
//             type: "feedback",
//             practice: false
//           }
//         });
//       }
//     }
//   }
// }
