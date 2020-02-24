import React from 'react';
import { Text, Platform } from 'react-native';
import { Skin } from '../config/Settings';

export class LightText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          { backgroundColor: 'transparent' },
          this.props.style,
          { fontFamily: Skin.Font_Light },
        ]}
      />
    );
  }
}

export class RegularText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          { backgroundColor: 'transparent' },
          this.props.style,
          { fontFamily: Skin.Font_Regular },
        ]}
      />
    );
  }
}

export class UnderlineText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          { backgroundColor: 'transparent' },
          this.props.style,
          { fontFamily: Skin.Font_Regular, textDecorationLine: 'underline' },
        ]}
      />
    );
  }
}

export class MediumText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          { backgroundColor: 'transparent' },
          this.props.style,
          { fontFamily: Skin.Font_Medium },
        ]}
      />
    );
  }
}

export class BoldText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          { backgroundColor: 'transparent' },
          this.props.style,
          { fontFamily: Skin.Font_Bold },
        ]}
      />
    );
  }
}

export class RegularTextMonospace extends React.Component {
  render() {
    const fontFamily = Platform.OS === 'ios' ? 'Courier' : 'monospace'
    return (
      <Text
        {...this.props}
        style={[
          { backgroundColor: 'transparent' },
          this.props.style,
          { fontFamily: fontFamily },
        ]}
      />
    )
  }
}