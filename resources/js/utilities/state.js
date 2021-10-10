import { useEffect } from "react";
import { useRecoilSnapshot } from "recoil";
import { createStore } from "redux";

/**
 * Usage:
 * const App = () => (
 *   <RecoilRoot>
 *     <RecoilDebugObserver />
 *     <AppEntryComponent />
 *   </RecoilRoot>
 * );
 */
let RecoilDebugObserver = () => null;

const reduxDevtoolsExtension =
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__;

if (reduxDevtoolsExtension) {
  const reducer = (state = {}, { type, payload }) => {
    if (String(type).startsWith("[recoil]")) {
      return { ...state, [payload.node.key]: payload.loadable };
    } else {
      return state;
    }
  };

  const store = createStore(
    reducer,
    reduxDevtoolsExtension({
      name: "recoil debug observer",
      maxAge: 100,
    })
  );

  RecoilDebugObserver = () => {
    const snapshot = useRecoilSnapshot();
    useEffect(() => {
      for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
        const loadable = snapshot.getLoadable(node);
        const action = {
          type: `[recoil] ${node.key}/${loadable.state}`,
          payload: { node, loadable },
        };
        store.dispatch(action);
      }
    }, [snapshot]);
    return null;
  };
}

export { RecoilDebugObserver };

