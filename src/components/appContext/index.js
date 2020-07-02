import React, {
  createContext,
  Component,
  useEffect,
  useContext,
  useReducer,
} from "react";

import { defaultState, resetState } from "./initialState";
import appReducer from "./reducer";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

class AppProvider extends Component {
  constructor() {
    super();
    this.state = {
      localState: null,
    };
  }

  componentDidMount() {
    const appState = window.localStorage.getItem("stored_app_state2");
    this.setState({
      localState: appState
        ? { ...JSON.parse(appState), ...resetState }
        : { ...defaultState, ...resetState },
    });
  }

  render() {
    if (this.state.localState) {
      return (
        <AppProviderStore localState={this.state.localState}>
          {this.props.children}
        </AppProviderStore>
      );
    } else {
      return null;
    }
  }
}

const AppProviderStore = ({ children, localState }) => {
  const [state, dispatch] = useReducer(appReducer, localState);

  useEffect(() => {
    window.localStorage.setItem("stored_app_state2", JSON.stringify(state));
  }, [state]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProviderStore");
  }
  return context;
};

const useAppDispatch = () => {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within an AppProviderStore");
  }
  return context;
};

const useApp = () => {
  return [useAppState(), useAppDispatch()];
};

export { AppProvider, useApp };
