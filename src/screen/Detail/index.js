import {
  Button,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {config} from '../../config';
import Axios from 'axios';
import {colors} from '../../utils/colors';
import {Gap, Latest} from '../../atoms';
import {Back, BackgroundSVG, Next, Time} from '../../assets/image';
import RBSheet from 'react-native-raw-bottom-sheet';

const Detail = ({route}) => {
  const refRBSheet = useRef();
  const [movie, setMovie] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [backDisable, setBackDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(false);
  const [detailMovie, setDetailMovie] = useState({});

  const url = route.params;
  useEffect(() => {
    if (page <= 1) {
      setBackDisable(true);
    } else if (page >= totalPage) {
      setNextDisable(true);
    }
    urlPopular();
    urlTopRated();
    console.log(movie);
  }, [page]);

  const urlPopular = () => {
    if (
      url == `${config.baseUrl}/movie/popular?page=1&api_key=${config.apiKey}`
    ) {
      Axios.get(
        `${config.baseUrl}/movie/popular?page=${page}&api_key=${config.apiKey}`,
      ).then(res => {
        setTotalPage(res.data.total_pages);
        setMovie(res.data.results);
      });
    }
  };

  const urlTopRated = () => {
    if (
      url == `${config.baseUrl}/movie/top_rated?page=1&api_key=${config.apiKey}`
    ) {
      Axios.get(
        `${config.baseUrl}/movie/top_rated?page=${page}&api_key=${config.apiKey}`,
      ).then(res => {
        setTotalPage(res.data.total_pages);
        setMovie(res.data.results);
      });
    }
  };

  const nextButton = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setBackDisable(false);
  };
  const backButton = () => {
    if (page <= 1) {
      setBackDisable(true);
    } else {
      const backPage = page - 1;
      setPage(backPage);
    }
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.movie}>MOVIE</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: -20,
          }}>
          <View>
            {movie.slice(0, 9).map(res => {
              const detailMovie = () => {
                Axios.get(
                  `${config.baseUrl}/movie/${res.id}?api_key=${config.apiKey}`,
                ).then(res => {
                  setDetailMovie(res.data);
                });
              };
              return (
                <View style={styles.card} key={res.id}>
                  <View
                    style={{
                      height: 300,
                      width: 190,
                    }}>
                    <View style={styles.card2}>
                      <Latest
                        judul={res.title}
                        tanggal={res.release_date}
                        gambar={`${config.baseImageUrl}${res.poster_path}`}
                        onPress={() => {
                          refRBSheet.current.open(), detailMovie();
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          <View>
            {movie.slice(10, 19).map(res => {
              const detailMovie = () => {
                Axios.get(
                  `${config.baseUrl}/movie/${res.id}?api_key=${config.apiKey}`,
                ).then(res => {
                  setDetailMovie(res.data);
                });
              };
              return (
                <View style={styles.card} key={res.id}>
                  <View
                    style={{
                      height: 300,
                      width: 190,
                    }}>
                    <View style={styles.card2}>
                      <Latest
                        judul={res.title}
                        tanggal={res.release_date}
                        gambar={`${config.baseImageUrl}${res.poster_path}`}
                        onPress={() => {
                          refRBSheet.current.open(), detailMovie();
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <Gap height={20} />
      </ScrollView>
      <View style={styles.tombol}>
        <TouchableOpacity disabled={backDisable} onPress={() => backButton()}>
          <Back
            height={30}
            width={30}
            style={{backgroundColor: colors.white, borderRadius: 100}}
          />
        </TouchableOpacity>
        <Text style={styles.text}>
          {page} / {totalPage}
        </Text>
        <TouchableOpacity disabled={nextDisable} onPress={() => nextButton()}>
          <Next
            height={30}
            width={30}
            style={{backgroundColor: colors.white, borderRadius: 100}}
          />
        </TouchableOpacity>
      </View>
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

export default Detail;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.black,
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    width: '100%',
  },
  card: {
    height: 360,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card2: {
    padding: 20,
    backgroundColor: '#rgba(0,0,0,0.5)',
    borderRadius: 30,
    height: 340,
    width: 190,
  },
  tombol: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
  },
  nextprev: {
    width: 100,
  },
  text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
  movie: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 30,
    letterSpacing: 5,
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
