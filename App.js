import React from 'react';
import { Image, TextInput, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
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
            <TextInput placeholder="hello"></TextInput>
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
