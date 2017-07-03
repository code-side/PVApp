import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={ styles.contentStyle }>
      {props.children}
    </View>
  );
};

const styles = {
  contentStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 2,
    padding: 10,
    borderColor: 'transparent'
  }
};

export default CardSection;
