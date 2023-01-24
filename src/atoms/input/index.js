import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';

const Input = ({onChangeText, value}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={'Cari'}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.background,
    borderRadius: 15,
    padding: 10,
    width: '100%',
  },
});
