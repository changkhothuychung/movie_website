import React from 'react'
import { Provider } from 'react-redux';
import App from './App';
import {store} from './store/store';

const MovieApp = () => {
    return(
        <React.Fragment>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.Fragment>
    )
}

export default React.memo(MovieApp);