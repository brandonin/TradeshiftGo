import React from 'react';
import { NativeModules, LayoutAnimation, Image, TextInput, StyleSheet, Text, View } from 'react-native';
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
  state = {
    inputs: {
      first: "20",
      second: "30",
      third: "20",
    },
    triangleTypes: "",
  }

  componentDidMount = () => {
    this.determineTriangleTypeAndSides();
  }


  handleChange = async (key, value) => {
    let inputs = {...this.state.inputs};
    inputs[key] = value;
    await this.setState({inputs});
    this.determineTriangleTypeAndSides();
  }

  determineTriangleTypeAndSides = () => {
    const {first, second, third} = this.state.inputs;
    let hypotenuse = -Infinity;
    let hypotenuseKey;
    for (const [key, value] of Object.entries(this.state.inputs)) {
      if (value > hypotenuse) {
        hypotenuse = value;
        hypotenuseKey = key;
      }
    }
    let [side1, side2] = assignSides(this.state.inputs);
    let triangleTypes;

    // triangle by sides
    if (hypotenuse === side1 && side1 === side2) triangleTypes = "equilateral";
    else if (hypotenuse === side1 || hypotenuse === side2 || side1 === side2) triangleTypes = "isosceles";
    else triangleTypes = 'scalene';

    if (this.inputIsNonZero()) {
      this.setState({triangleTypes, hypotenuse, side1, side2});
    }
    function assignSides(object) {
      for (const [key, value] of Object.entries(object)) {
        if (key === hypotenuseKey) {
          continue;
        }
        if (!side1) {
          side1 = value || 0;
        } else {
          side2 = value || 0;
        }
      }
      return [side1, side2];
    }
  }

  inputIsNonZero = () => {
    return Object.values(this.state.inputs).indexOf('') < 0 &&
      Object.values(this.state.inputs).indexOf('0') < 0;
  }

  dynamicStyling = () => {
    LayoutAnimation.easeInEaseOut();
    return {
      borderLeftWidth: parseInt(this.state.side1),
      borderRightWidth: parseInt(this.state.side2),
      borderBottomWidth: parseInt(this.state.hypotenuse),
    }
  }

  render() {
    const tsLogo = {
        uri: 'https://tradeshift.com/wp-content/themes/Tradeshift/img/brand/logo-black.png',
    };
    const { triangleTypes } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.topBanner}>
          <Image source={tsLogo} style={{width: 332, height: 40}}/>
        </View>
        <View style={styles.textContainer}>
          <View style={{ flexDirection:'row' }}>
            <Text>Length 1: </Text>
            <TextInput keyboardType="numeric" style={styles.input} value={this.state.inputs.first} placeholder="Length 1" onChangeText={(value) => this.handleChange('first', value)}></TextInput>
          </View>
          <View style={{ flexDirection:'row' }}>
            <Text>Length 2: </Text>
            <TextInput keyboardType="numeric" style={styles.input} value={this.state.inputs.second} placeholder="Length 2" onChangeText={(value) => this.handleChange('second', value)}></TextInput>
          </View>
          <View style={{ flexDirection:'row' }}>
            <Text>Length 3: </Text>
            <TextInput keyboardType="numeric" style={styles.input} value={this.state.inputs.third} placeholder="Length 3" onChangeText={(value) => this.handleChange('third', value)}></TextInput>
          </View>
          <Text>Type of Triangle: {triangleTypes}</Text>
          <View style = {[styles.triangle, this.dynamicStyling()]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  textContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  topBanner: {
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#00b0ff',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
  },
  h1: {
    fontSize: 16,
    fontWeight: '900',
    paddingBottom: 15,
    paddingTop: 15,
    textAlign: 'center',
  },
  li: {
    paddingBottom: 15,
    paddingLeft: 25,
    paddingTop: 15,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: 'red',
  },
  input: {
    backgroundColor: "rgba(180, 180, 180, 0.5)",
    textAlign: "center",
  }
});
