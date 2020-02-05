import React from 'react';
import {
    Image,
    View
} from 'react-native';

export default class PostImageWrapper extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            containerWidth: props.containerWidth,
            imageDisplayHeight: 0
        }

        Image.getSize(this.props.source.uri, this.calculateHeight)
    }

    calculateHeight = (width, height) => {
        let ratio = width / height
        let imageDisplayHeight = this.state.containerWidth / ratio;

        this.setState({ imageDisplayHeight })
    }

    render() {
        return (
            <Image
                style={{ width: this.props.containerWidth, height: this.state.imageDisplayHeight }}
                source={this.props.source} />
        )
    }
}