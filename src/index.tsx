import * as React from "react";
import {
  getInstruments,
  InstrumentName,
  PlayingNotesMap,
  InstrumentsMap
} from "mobx-music";
import { renderAndAddProps } from "render-and-add-props";
export * from "mobx-music";

export type ReactMobxMusicProps = {
  instrumentNames: InstrumentName[];
  children: (state: ReactMobxMusicState) => any;
};

export type ReactMobxMusicState = {
  isLoading: boolean;
  instruments: InstrumentsMap;
  playingNotes: PlayingNotesMap;
};
export class ReactMobxMusic extends React.Component<
  ReactMobxMusicProps,
  ReactMobxMusicState
> {
  state = {
    isLoading: true,
    instruments: new Map() as ReactMobxMusicState["instruments"],
    playingNotes: new Map() as ReactMobxMusicState["playingNotes"]
  };
  async componentDidMount() {
    const { instruments, playingNotes } = await getInstruments(
      this.props.instrumentNames
    );
    this.setState({ isLoading: false, instruments, playingNotes });
  }

  async componentDidUpdate(prevProps: ReactMobxMusicProps) {
    if (prevProps.instrumentNames === this.props.instrumentNames) {
      return;
    }
    this.setState({ isLoading: true });
    const { instruments, playingNotes } = await getInstruments(
      this.props.instrumentNames
    );
    this.setState({ isLoading: false, instruments, playingNotes });
  }
  shouldComponentUpdate(
    nextProps: ReactMobxMusicProps,
    nextState: { isLoading: boolean }
  ) {
    return (
      nextProps.instrumentNames !== this.props.instrumentNames ||
      this.state.isLoading !== nextState.isLoading
    );
  }
  render() {
    const { children } = this.props;
    return renderAndAddProps(children, this.state);
  }
}

export default ReactMobxMusic;
