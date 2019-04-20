import React from 'react';
import { Text } from 'react-native';

export class LightText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        style={[
          { backgroundColor: 'transparent' },
          this.props.style,
          { fontFamily: 'heebo-light' },
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
          { fontFamily: 'heebo' },
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
          { fontFamily: 'heebo', textDecorationLine: 'underline' },
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
          { fontFamily: 'heebo-medium' },
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
          { fontFamily: 'heebo-bold' },
        ]}
      />
    );
  }
}
