import React, {Component} from 'react';
import './Header.css';
import { Container, Header as Head } from 'semantic-ui-react';

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <Container>
                    <Head
                        content="360 CIAN Hackathon"
                        className="Header-title"
                    />
                </Container>
            </header>
        );
    }
}

export default Header;
