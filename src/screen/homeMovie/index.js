import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {JSONHarian, JSONTipe} from '../../assets';
import {BackgroundSVG, Search, Time} from '../../assets/image';
import {Gap, Harian, Input, Latest, ListFilm, Tipe} from '../../atoms';
import {config} from '../../config';
import {colors} from '../../utils/colors';
import RBSheet from 'react-native-raw-bottom-sheet';

const HomeMovie = ({navigation}) => {
  const refRBSheet = useRef();
  const [favorite, setFavorite] = useState([]);
  const [akanDatang, setAkanDatang] = useState([]);
  const [search, setSearch] = useState('');
  const [disable, setDisable] = useState(true);
  const [detailMovie, setDetailMovie] = useState({});

  useEffect(() => {
    getFavorite();
    getUpComing();
    console.log(search);
    if (search == '') {
      setDisable(true);
    }
  }, [search]);

  const getUpComing = () => {
    axios
      .get(`${config.baseUrl}/movie/popular?api_key=${config.apiKey}`)
      .then(res => {
        setAkanDatang(res.data.results);
        console.log('movie', akanDatang);
      });
  };

  const getFavorite = async () => {
    const takeFavorite = await axios.get(
      `${config.baseUrl}/movie/top_rated?api_key=${config.apiKey}`,
    );
    setFavorite(takeFavorite.data.results);
  };

  const urlGetComing = `${config.baseUrl}/movie/popular?page=1&api_key=${config.apiKey}`;
  const urlTopRated = `${config.baseUrl}/movie/top_rated?page=1&api_key=${config.apiKey}`;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.searchbar}>
          <Input
            onChangeText={value => {
              setSearch(value), setDisable(false);
            }}
            value={search}
            style={{color: '#000000'}}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('Cari', search)}
            disabled={disable}>
            <Search />
          </TouchableOpacity>
        </View>
        <Text style={styles.bab}>Movie Menarik</Text>
        <Gap height={20} />
        <View style={{marginHorizontal: -25}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.latest}>
              {akanDatang.map(res => {
                const detailMovie = () => {
                  axios
                    .get(
                      `${config.baseUrl}/movie/${res.id}?api_key=${config.apiKey}`,
                    )
                    .then(res => {
                      setDetailMovie(res.data);
                    });
                };
                return (
                  <View key={res.id} style={{paddingRight: 30}}>
                    <Latest
                      judul={res.title}
                      tanggal={res.release_date}
                      gambar={`${config.baseImageUrl}${res.poster_path}`}
                      onPress={() => {
                        refRBSheet.current.open(), detailMovie();
                      }}
                    />
                  </View>
                );
              })}
              <Latest
                judul={'Lihat Lebih Banyak'}
                tipe={'selanjutnya'}
                onPress={() => navigation.navigate('Detail', urlGetComing)}
              />
              <Gap width={30} />
            </View>
          </ScrollView>
        </View>
        <Gap height={10} />
        <Text style={styles.bab}>Top Rated</Text>
        {favorite.map(res => {
          const detailMovie = () => {
            axios
              .get(`${config.baseUrl}/movie/${res.id}?api_key=${config.apiKey}`)
              .then(res => {
                setDetailMovie(res.data);
              });
          };
          return (
            <ListFilm
              key={res.id}
              judul={res.title}
              rated={res.vote_average}
              tanggal={res.release_date}
              gambar={`${config.baseImageUrl}${res.poster_path}`}
              waktu={res.popularity}
              onPress={() => {
                refRBSheet.current.open(), detailMovie();
              }}
            />
          );
        })}
        <ListFilm
          tipe={'next'}
          onPress={() => navigation.navigate('Detail', urlTopRated)}
        />
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        animationType={'slide'}
        openDuration={700}
        height={530}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={{flex: 1, backgroundColor: colors.black}}>
          <ImageBackground
            source={{uri: `${config.baseImageUrl}${detailMovie.poster_path}`}}
            style={{flex: 1}}
            imageStyle={{opacity: 0.2}}
            blurRadius={5}
            resizeMode="cover">
            <Image
              source={{
                uri: `${config.baseImageUrl}${detailMovie.backdrop_path}`,
              }}
              style={styles.gambar}
            />
            <Image
              source={{
                uri: `${config.baseImageUrl}${detailMovie.poster_path}`,
              }}
              style={styles.poster}
            />
            <BackgroundSVG
              height={800}
              width={470}
              style={{
                position: 'absolute',
                opacity: 1,
                marginLeft: -30,
                opacity: 0.85,
                marginTop: 60,
              }}
            />
            <View>
              <View style={styles.textPenjelas}>
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                  <View>
                    <Text style={styles.detailTextJudul}>
                      {detailMovie.title}
                    </Text>
                    <Text style={styles.detailTextTag}>
                      {detailMovie.tagline}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Time height={20} width={20} style={styles.waktu} />
                    <Text style={styles.detailTextWaktu}>
                      {detailMovie.runtime} Minutes
                    </Text>
                  </View>
                  <Text style={styles.detailText}>
                    Release : {detailMovie.release_date}
                  </Text>
                </View>
              </View>
              <Text style={styles.detailTextOverview}>
                {detailMovie.overview}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </RBSheet>
    </View>
  );
};

export default HomeMovie;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    padding: 25,
    width: '100%',
  },
  searchbar: {
    width: '100%',
    opacity: 1,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  latest: {
    flexDirection: 'row',
    paddingLeft: 25,
  },
  bab: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    color: colors.white,
    lineHeight: 21,
    fontSize: 18,
    letterSpacing: 2,
  },
  gambar: {
    height: 175,
    opacity: 1,
    borderRadius: 25,
  },
  poster: {
    height: 225,
    width: 150,
    borderRadius: 25,
    position: 'absolute',
    marginTop: 95,
    marginLeft: 25,
    elevation: 30,
    opacity: 20,
    zIndex: 1,
  },
  detailText: {
    color: colors.white,
  },
  detailTextWaktu: {
    color: colors.white,
    fontSize: 14,
    paddingLeft: 7,
    fontWeight: '600',
  },
  detailTextTag: {
    color: colors.white,
    position: 'relative',
    fontSize: 15,
    fontWeight: '400',
  },
  detailTextJudul: {
    color: colors.white,
    position: 'absolute',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    letterSpacing: 2,
    position: 'relative',
  },
  detailTextOverview: {
    fontWeight: '500',
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 130,
    position: 'absolute',
    width: 400,
    padding: 20,
    fontFamily: 'lucida grande',
    textAlign: 'justify',
  },
  waktu: {
    position: 'relative',
  },
  textPenjelas: {
    position: 'absolute',
    marginLeft: 180,
    width: 220,
    height: 120,
  },
});
