import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

// const { height } = Dimensions.get("screen")
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  show = () => {
    this.setState({
      show: true,
    });
  };
  close = () => {
    this.setState({
      show: false,
    });
  };
  renderTitle = () => {
    const {title} = this.props;
    return (
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };
  renderOutsideTouchable = onTouch => {
    const view = <View style={{flex: 1}} />;
    if (!onTouch) {
      return view;
    }
    return (
      <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1}}>
        {view}
      </TouchableWithoutFeedback>
    );
  };

  render() {
    const {show} = this.state;
    const {onTouchOutside, renderContent, height, loading} = this.props;
    return (
      <Modal
        visible={show}
        animationType="fade"
        transparent={true}
        onRequestClose={this.close}>
        <View style={styles.contant}>
          {loading && (
            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(52,52,52,0.8)',
                zIndex: 9999,
              }}>
              <ActivityIndicator size="small" color="white" />
            </View>
          )}
          {this.renderOutsideTouchable(onTouchOutside)}
          <SafeAreaView style={[styles.content, {height: height}]}>
            {this.renderTitle()}
            {renderContent}
          </SafeAreaView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  contant: {
    flex: 1,
    backgroundColor: '#000000AA',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
  },
  title: {
    color: '#182E44',
    fontSize: 20,
    fontWeight: '500',
    margin: 15,
    textAlign: 'center',
  },
});

export default index;
