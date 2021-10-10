import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import RouteItems from './components/RouteItems'
import { RecoilDebugObserver } from './utilities/state';

const App = () => (
    <RecoilRoot>
        {/* <RecoilDebugObserver /> */}
        <RouteItems />
    </RecoilRoot>
)

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
