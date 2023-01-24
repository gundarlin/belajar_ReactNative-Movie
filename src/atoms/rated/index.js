import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {Star} from '../../assets/image';

const Rated = ({rated}) => {
  return (
    <View style={styles.container}>
      <Star />
      <Text style={styles.text}>{rated}</Text>
    </View>
  );
};

export default Rated;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    width: 34,
    height: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    color: colors.black,
  },
});
