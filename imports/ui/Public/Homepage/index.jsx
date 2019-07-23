import React, { Component } from 'react';

import ImageOverlap from './ImageOverlap';

import './index.scss';


export default class MainLanding extends Component {
    state = {
        iframeInput: 'http://localhost:3005',
        iframeUrl: 'http://localhost:3005',
        iframeHeight: '90', // 97.9
        iframeHeightUnit: 'vh',
        iframeWidth: '100', // 100.2
        iframeWidthUnit: 'vw',
        imageOpacityInput: 0.5,
        imageTopInput: 0, // 3
        imageLeftInput: 0, // 1
    }

    _handleOnSubmit = (e) => {
        e.preventDefault();

        const { iframeInput } = this.state;

        this.setState({
            iframeUrl: iframeInput,
        });
    }

    _handleOnSubmitImage = (e) => {
        e.preventDefault();
    }

    _handleInputChange = (e) => {
        const inputValue = e.nativeEvent.srcElement.value;
        const inputName = e.nativeEvent.srcElement.name;

        this.setState({
            [inputName]: inputValue,
        });
    }

    /* eslint-disable jsx-a11y/label-has-for */
    render() {
        const {
            iframeInput,
            iframeUrl,
            iframeHeight,
            iframeHeightUnit,
            iframeWidth,
            iframeWidthUnit,
            imageOpacityInput,
            imageTopInput,
            imageLeftInput,
        } = this.state;

        const style = {
            height: `${iframeHeight}${iframeHeightUnit}`,
            width: `${iframeWidth}${iframeWidthUnit}`,
        };

        return (
            <div className="homepage">
                <main className="homepage-main">
                    <form className="p-b-5" onSubmit={this._handleOnSubmit}>
                        <label htmlFor="iframeInput">Iframe url</label>
                        <input className="p-2 m-h-2" type="text" name="iframeInput" defaultValue={iframeInput} onChange={this._handleInputChange} />
                        <label htmlFor="iframeWidth">Iframe width</label>
                        <input className="p-2 m-h-2" type="number" name="iframeWidth" defaultValue={iframeWidth} onChange={this._handleInputChange} />
                        <input className="p-2 m-h-2" type="text" name="iframeWidthUnit" defaultValue={iframeWidthUnit} onChange={this._handleInputChange} />
                        <label htmlFor="iframeHeight">Iframe height</label>
                        <input className="p-2 m-h-2" type="number" name="iframeHeight" defaultValue={iframeHeight} onChange={this._handleInputChange} />
                        <input className="p-2 m-h-2" type="text" name="iframeHeightUnit" defaultValue={iframeHeightUnit} onChange={this._handleInputChange} />
                        <button className="p-2 m-h-2">Reload iframe</button>
                    </form>

                    <form className="p-b-5" onSubmit={this._handleOnSubmitImage}>
                        <label htmlFor="imageOpacityInput">Opacity</label>
                        <input className="p-2 m-h-2" type="number" step="0.1" name="imageOpacityInput" defaultValue={imageOpacityInput} onChange={this._handleInputChange} />
                        <label htmlFor="imageTopInput">Top</label>
                        <input className="p-2 m-h-2" type="number" name="imageTopInput" defaultValue={imageTopInput} onChange={this._handleInputChange} />
                        <label htmlFor="imageLeftInput">Left</label>
                        <input className="p-2 m-h-2" type="number" name="imageLeftInput" defaultValue={imageLeftInput} onChange={this._handleInputChange} />
                    </form>

                    <div className="homepage-testing-grounds" style={style}>
                        <iframe title="testing-grounds" src={iframeUrl} height="100%" width="100%" />

                        <ImageOverlap
                            opacity={imageOpacityInput}
                            top={imageTopInput}
                            left={imageLeftInput}
                        />
                    </div>
                </main>
            </div>
        );
    }
}
