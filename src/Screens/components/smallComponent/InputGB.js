/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Image,
  ScrollView,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';

export default class InputGB extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      inFocused: '',
      placeholder: '',
    };
  }

  componentDidMount() {
    this.setState({
      placeholder: this.props.holder,
    });
  }
  onFocusedMode = () => {
    this.setState({inFocused: 'yes'});
    this.setState({placeholder: ''});
  };
  onEndProcess() {
    this.setState({inFocused: ''});
    this.setState({placeholder: this.props.holder});
  }
  render() {
    const {
      holder,
      style,
      secureText,
      onChangeText,
      value,
      maxLength,
      type,
      keyboardType,
      iconstyle,
      className,
      styleInput,
      laberStyle,
    } = this.props;
    const {placeholder} = this.state;
    return (
      <View
        style={[
          this.state.inFocused === 'yes'
            ? styles.inputFocused
            : styles.accInput,
        ]}>
        {type === 'Fontisto' && (
          <Fontisto style={[styles.iconStyle, iconstyle]} name={className} />
        )}
        {type === 'MaterialIcons' && (
          <MaterialIcons
            style={[styles.iconStyle, iconstyle]}
            name={className}
          />
        )}
        {type === 'Ionicons' && (
          <Ionicons style={[styles.iconStyle, iconstyle]} name={className} />
        )}
        {type === 'FontAwesome5' && (
          <FontAwesome5
            style={[styles.iconStyle, iconstyle]}
            name={className}
          />
        )}
        {type === 'FontAwesome' && (
          <FontAwesome style={[styles.iconStyle, iconstyle]} name={className} />
        )}
        {type === 'Entypo' && (
          <Entypo style={[styles.iconStyle, iconstyle]} name={className} />
        )}
        {type === 'Foundation' && (
          <Foundation style={[styles.iconStyle, iconstyle]} name={className} />
        )}
        {this.state.inFocused === 'yes' && (
          <Text style={[styles.laber, laberStyle]}>{holder}</Text>
        )}
        <TextInput
          style={[{fontSize: 17}, styleInput]}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureText}
          maxLength={maxLength}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => this.onFocusedMode()}
          onEndEditing={() => this.onEndProcess()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  accInput: {
    width: '100%',
    paddingLeft: 50,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 15,
  },
  iconStyle: {
    position: 'absolute',
    fontSize: 25,
    top: '35%',
    left: '5%',
    color: '#2477B2',
  },
  laber: {
    position: 'absolute',
    backgroundColor: '#f2f2f2',
    color: '#2477B2',
    paddingHorizontal: 5,
    top: -10,
    left: 55,
    fontSize: 15,
  },
  inputFocused: {
    width: '100%',
    paddingLeft: 50,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#2477B2',
    borderRadius: 5,
    marginVertical: 15,
  },
});
