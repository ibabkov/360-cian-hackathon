import React, {Component} from 'react';
import './Images.css';
import { ImageGroup, Image, Modal, Icon } from 'semantic-ui-react';
import Panorama from "../Panorama/Panorama";

import { IMAGES_ARRAY } from './imagesMap';

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

class Images extends Component {
    constructor(props) {
        super(props);
        let storedLikes = [];
        if (
            typeof window !== 'undefined'
        ) {
            storedLikes = JSON.parse(localStorage.getItem("likesArray"));
        }


        this.state ={
            isModalOpen: false,
            isStoriesMod: false,
            images: IMAGES_ARRAY,
            modalIndex: null,
            buttonText: 'Записаться на просмотр',
            likesArray: storedLikes && storedLikes.length ? storedLikes : [],
        }
        this.timer = null;
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <div>
                <div
                    className="Image-stories"
                    onClick={this.handleOpenStories}
                >
                    Stories!
                </div>
                <ImageGroup>
                    <div className="ImageGroup">
                        {this.state.images.map(({ name, src, srcSmall }, i) => <Modal
                            key={name + i}
                            className="Image-modal"
                            trigger={
                                <div className="ImageContainer">
                                    <Image
                                        className="Image"
                                        src={srcSmall}
                                        size="small"
                                        onClick={this.handleOpen(i)}
                                    />
                                    <span className="ImageLabel">{name}</span>
                                    <div
                                        className="Image-like--small"
                                        onClick={this.handleLikeClick(i)}
                                    >
                                        <Icon
                                            name="like"
                                            size="small"
                                        />
                                        {this.state.likesArray[i] || '0'}
                                    </div>
                                </div>
                            }
                            open={this.state.isModalOpen && this.state.modalIndex === i}
                            onClose={this.handleClose}
                            basic
                            size='small'
                        >
                            {this.state.isModalOpen && this.state.modalIndex === i
                                ? <>
                                    <Panorama name={name} src={src}/>
                                    <div
                                        className="Image-close"
                                        onClick={this.handleClose}
                                    >
                                        <Icon
                                            name="compress"
                                            size="large"
                                        />
                                    </div>
                                    <div
                                        className="Image-like"
                                        onClick={this.handleLikeClick(i)}
                                    >
                                        <Icon
                                            name="like"
                                            size="large"
                                        />
                                        {this.state.likesArray[i] || '0'}
                                    </div>
                                    <div
                                        className="Image-button"
                                        onClick={this.handleButtonClick}
                                    >
                                        {this.state.buttonText}
                                    </div>
                                    <div
                                        className={`Image-random ${this.state.isStoriesMod ? 'Image-random--stories' : ''}`}
                                        onClick={this.handleRandom(i)}
                                    >
                                        <Icon
                                            name="building outline"
                                            size="big"
                                        />
                                    </div>
                                    {/*<div className="Image-backward" >*/}
                                        {/*<Icon*/}
                                            {/*name="backward"*/}
                                            {/*size="large"*/}
                                            {/*onClick={this.handleRandom(i)}*/}
                                        {/*/>*/}
                                    {/*</div>*/}
                                    {/*<div className="Image-forward" >*/}
                                        {/*<Icon*/}
                                            {/*name="forward"*/}
                                            {/*size="large"*/}
                                            {/*onClick={this.handleRandom(i)}*/}
                                        {/*/>*/}
                                    {/*</div>*/}
                                </>
                                :null
                            }
                        </Modal>)}
                    </div>
                </ImageGroup>
            </div>
        );
    }

    handleRandom = (i) => () => {
        const randomIndex = randomInteger(0, this.state.images.length);
        this.setState({
            modalIndex: i === randomIndex
                ? randomInteger(0, this.state.images.length)
                : randomIndex,
            buttonText: 'Записаться на просмотр',
        });
    };

    handleTimeout = () => {
        const randomIndex = randomInteger(0, this.state.images.length);
        this.setState({
            modalIndex: this.state.modalIndex === randomIndex
                ? randomInteger(0, this.state.images.length)
                : randomIndex,
        });
    };

    handleOpenStories = () => {
        this.setState({
            isStoriesMod: true,
        });

        this.timer = setTimeout(this.handleTimeout, 10000);

        this.handleOpen(randomInteger(0, this.state.images.length))();
    };

    handleOpen = (i) => () => {
        this.setState({
            modalIndex: i,
            isModalOpen: true,
            buttonText: 'Записаться на просмотр',
        });
    };

    handleButtonClick = () => {
        this.setState({
            buttonText: 'ВЫ ЗАПИСАНЫ!',
        });
    };

    handleLikeClick = (i) => () => {
        let likesArray = [ ...this.state.likesArray ];

        likesArray[i] = (likesArray[i] || 0) + 1;

        localStorage.setItem("likesArray", JSON.stringify(likesArray));

        this.setState({
            likesArray,
        });
    };

    handleClose = () => {
        clearTimeout(this.timer);

        this.setState({
            modalIndex: null,
            isModalOpen: false,
            isStoriesMod: false,
            buttonText: 'Записаться на просмотр',
        });
    }
}

export default Images;
