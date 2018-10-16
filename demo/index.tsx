import * as ReactDOM from "react-dom";
import * as React from "react";
import { getInstrumentNames } from "mobx-music";
import ReactMobxMusic from "../src/";

export const App = () => {
  return (
    <ReactMobxMusic instrumentNames={["accordion"]}>
      {({ isLoading, instruments }) =>
        isLoading ? (
          <div>Oh hasdai {isLoading}</div>
        ) : (
          <div>
            Loaded !
            <button
              onMouseDown={() => {
                instruments.get("accordion").play("A4");
              }}
              onMouseUp={() => {
                instruments.get("accordion").stop("A4");
              }}
            >
              Play A4
            </button>
          </div>
        )
      }
    </ReactMobxMusic>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
