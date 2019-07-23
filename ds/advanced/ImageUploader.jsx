import React, { PureComponent } from 'react';
import classNames from 'classnames';

import { ImagesCollection } from '/shared/imageHelpers';


// TODO: use a REF that is not a string.
// TODO: Should upload to S3, flicker or something like that.
export default class ImageUploader extends PureComponent {
    state = {
        image: '',
        uploading: [],
        progress: 0,
        inProgress: false,
    }

    componentWillReceiveProps = (nextProps) => {
        const { image } = nextProps;

        this.setState({
            image,
        });
    }

    /**
     * Handle the profile picture upload
     * @param Event event
     */
    _uploadProfilePicture = (event) => {
        event.preventDefault();

        const self = this;

        if (event.currentTarget.files && event.currentTarget.files[0]) {
            // Solo un archivo (por mas que seleccionen multiples)
            const file = event.currentTarget.files[0];

            if (file) {
                const uploadInstance = ImagesCollection.insert({
                    file,
                    streams: 'dynamic',
                    chunkSize: 'dynamic',
                    allowWebWorkers: true, // If you see issues with uploads, change this to false
                }, false);

                self.setState({
                    uploading: uploadInstance, // Keep track of this instance to use below
                    inProgress: true, // Show the progress bar now
                });

                uploadInstance.on('uploaded', (error, fileObj) => {
                    // Remove the filename from the upload box
                    self.refs['fileinput'].value = '';
                    const photoRoute = `/${fileObj._downloadRoute}/${fileObj._id}${fileObj.extensionWithDot}`;
                    // Reset our state for the next file
                    self.setState({
                        image: photoRoute,
                        uploading: [],
                        progress: 0,
                        inProgress: false,
                    });
                    self.props.onImageChange(photoRoute);
                });

                uploadInstance.on('error', (error) => {
                    alert(`Error durante upload: ${error}`);
                });

                uploadInstance.on('progress', (progress) => {
                    // Update our progress bar
                    self.setState({
                        progress,
                    });
                });
                uploadInstance.start(); // Must manually start the upload
            }
        }
    }

    render() {
        const { label, placeholder } = this.props;
        const { image } = this.state;
        const uploaderContainerClassNames = classNames(
            'image-uploader__container',
            'form-group',
        );

        return (
            <div className={uploaderContainerClassNames}>
                <label htmlFor="photo">{label}</label>
                <input className="form-control" type="text" name="photo" placeholder={placeholder} value={image} />
                <input type="file" id="fileinput" disabled={this.state.inProgress} ref="fileinput" onChange={this._uploadProfilePicture} />
                { this.state.progress > 0 && this.state.progress < 100 && <div className="upload-progress">{this.state.progress}%</div>}
            </div>
        );
    }
}
