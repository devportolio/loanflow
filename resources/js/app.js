import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux'

import RouteItems from './components/RouteItems'

const App = () => (
    <Provider store={store}>
        <RouteItems />
    </Provider>
)

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
