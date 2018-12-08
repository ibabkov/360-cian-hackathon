import React, {Component} from 'react'
import Container from './shared/Container.jsx'
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
    constructor(props) {
        super(props);
        if (
            typeof window !== 'undefined'
        ) {
            // window.addEventListener('load', function() {
            //     window.navigator.serviceWorker.register('/sw.js').then(
            //     function(registration) {
            //         // Registration was successful
            //         console.log('ServiceWorker registration successful with scope: ', registration.scope); },
            //     function(err) {
            //         // registration failed :(
            //         console.log('ServiceWorker registration failed: ', err);
            //     });
            // });

            let vh = window.innerHeight * 0.01;
            // Then we set the value in the --vh custom property to the root of the document
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            window.addEventListener("resize", () => {
                let vh = window.innerHeight * 0.01;
                // Then we set the value in the --vh custom property to the root of the document
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            });

        }
    }
    render() {
        return (
            <div>
                <Container />
            </div>
        );
    }
}

export default App;
