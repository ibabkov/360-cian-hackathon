import React, {Component} from 'react';
import Header from './components/Header/Header.jsx';
import Images from './components/Images/Images.jsx';
import './Container.css';
import { Container as Layout } from 'semantic-ui-react';

class Container extends Component {
    render() {
        return (
            <>
                <Header />
                <main className="Container">
                    <Layout className="Layout">
                        <Images />
                    </Layout>
                </main>
            </>
        );
    }
}

export default Container;
