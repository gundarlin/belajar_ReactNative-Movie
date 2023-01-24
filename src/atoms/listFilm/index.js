import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../utils/colors';
import {tes, Time} from '../../assets/image';
import Gap from '../Gap';
import Rated from '../rated';

const ListFilm = ({judul, tanggal, waktu, rated, gambar, onPress, tipe}) => {
  if (tipe == 'next') {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.nextContainer}>
          <Text style={styles.text('judul')}>Lihat Lebih Banyak</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={{paddingRight: 25, paddingLeft: 14}}>
          <Image source={{uri: gambar}} style={styles.gambar} />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            flex: 1,
          }}>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={styles.text('judul')}>{judul}</Text>
            <Text style={styles.text()}>{tanggal}</Text>
            <Gap height={1} />
            <View
              style={{
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.time('popular')}>Popularitas</Text>
              <Gap width={10} />
              <Text style={styles.time()}>{waktu}</Text>
            </View>
          </View>
          <View style={{paddingRight: 27, marginTop: -16}}>
            <Rated rated={rated} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListFilm;

const styles = StyleSheet.create({
  nextContainer: {
    marginVertical: 10,
    backgroundColor: colors.card,
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 25,
    justifyContent: 'center',
  },
  container: {
    marginVertical: 10,
    backgroundColor: colors.card,
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 25,
  },
  gambar: {
    height: 90,
    width: 68,
    borderRadius: 10,
    paddingRight: 25,
  },
  text: type => ({
    color: type == 'judul' ? colors.white : 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 10,
    width: 140,
  }),
  time: type => ({
    color: type == 'popular' ? '#000000' : colors.white,
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 16,
  }),
});
