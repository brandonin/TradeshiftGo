import React from 'react';
import { Image, TextInput, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  state = {
    sides: {
      first: "2",
      second: "3",
      third: "2",
    },
    triangleTypes: []
  }

  componentDidMount = () => {
    this.determineTriangleType();
  }


  handleChange = async (key, value) => {
    let sides = {...this.state.sides};
    sides[key] = value;
    await this.setState({sides});
    this.determineTriangleType();
  }

  determineTriangleType = () => {
    const {first, second, third} = this.state.sides;
    let hypotenuse = -Infinity;
    let hypotenuseKey;
    for (const [key, value] of Object.entries(this.state.sides)) {
      if (value > hypotenuse) {
        hypotenuse = value;
        hypotenuseKey = key;
      }
    }
    let [side1, side2] = assignSides(this.state.sides);
    let triangleTypes = [];

    // triangle by sides
    if (hypotenuse === side1 && side1 === side2) triangleTypes.push("equilateral", "equilangular");
    else if (hypotenuse === side1 || hypotenuse === side2 || side1 === side2) triangleTypes.push("isosceles");
    else triangleTypes.push('scalene');

    // triangle by angles
    if (Math.pow(hypotenuse, 2) == Math.pow(side1, 2) + Math.pow(side2, 2)) triangleTypes.push("right");
    if (Math.pow(hypotenuse, 2) < Math.pow(side1, 2) + Math.pow(side2, 2)) triangleTypes.push("acute");
    if (Math.pow(hypotenuse, 2) > Math.pow(side1, 2) + Math.pow(side2, 2)) triangleTypes.push("obtuse");

    this.setState({triangleTypes});
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

  render() {
    const tsLogo = {
        uri: 'https://tradeshift.com/wp-content/themes/Tradeshift/img/brand/logo-black.png',
    };
    return (
      <View style={styles.container}>
        <View style={styles.topBanner}>
          <Image source={tsLogo} style={{width: 332, height: 40}}/>
        </View>
        <View style={styles.textContainer}>
            <TextInput keyboardType="numeric" value={this.state.sides.first} placeholder="hello" onChangeText={(value) => this.handleChange('first', value)}></TextInput>
            <TextInput keyboardType="numeric" value={this.state.sides.second} placeholder="hello" onChangeText={(value) => this.handleChange('second', value)}></TextInput>
            <TextInput keyboardType="numeric" value={this.state.sides.third} placeholder="hello" onChangeText={(value) => this.handleChange('third', value)}></TextInput>
            <Text>Types of Traingle this is:</Text>
            {this.state.triangleTypes.map((value, key) => {
              return <Text key={key}>{value}</Text>;
            })}
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
});
