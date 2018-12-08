import React, {Component} from 'react';
import './Panorama.css';

class Panorama extends Component {
    componentDidMount(){
        import('aframe');
        console.log(this.container)
    }
    render() {
        return (
            <div className="Panorama">
                <a-scene>
                    <a-sky src={this.props.src} rotation="0 -130 0"></a-sky>
                </a-scene>
            </div>
        );
    }
}

export default Panorama;
