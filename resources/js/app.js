import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

import RouteItems from './components/RouteItems'

const App = () => (
    <Provider store={store}>
        <ChakraProvider>
            <RouteItems />
        </ChakraProvider>
    </Provider>
)

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
