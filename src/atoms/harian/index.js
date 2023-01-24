import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';

const Harian = ({harian}) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>{harian}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Harian;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: 100,
    alignItems: 'center',
    padding: 5,
    borderRadius: 20,
    shadowColor: '#000000',
    elevation: 10,
  },
  text: {
    fontWeight: 'bold',
    color: colors.black,
  },
});
