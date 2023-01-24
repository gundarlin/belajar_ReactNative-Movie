import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';

const Tipe = ({tipe}) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.text}>{tipe}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Tipe;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: 80,
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
