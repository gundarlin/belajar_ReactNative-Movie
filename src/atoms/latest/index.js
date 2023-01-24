import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Next, tes} from '../../assets/image';
import Gap from '../Gap';
import {colors} from '../../utils/colors';

const Latest = ({gambar, judul, tanggal, tipe, onPress}) => {
  if (tipe == 'selanjutnya') {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.page2}>
          <Next height={150} width={150} style={styles.svg} />
          <Gap height={14} />
          <Text style={styles.text}>{judul}</Text>
          <Text style={styles.liris}>{tanggal}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.page}>
        <Image source={{uri: gambar}} style={styles.gambar} />
        <Gap height={14} />
        <Text style={styles.text}>{judul}</Text>
        <Text style={styles.liris}>{tanggal}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Latest;

const styles = StyleSheet.create({
  page: {},
  page2: {paddingTop: 32},
  gambar: {
    height: 225,
    width: 150,
    borderRadius: 25,
  },
  text: {
    color: colors.white,
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 10,
    width: 150,
  },
  liris: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    fontStyle: 'normal',
    marginLeft: 10,
    marginTop: 5,
  },
  svg: {
    backgroundColor: colors.white,
    borderRadius: 50,
  },
});
