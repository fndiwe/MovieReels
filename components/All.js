import React from 'react';
import {View, Text, Dimensions, ScrollView} from 'react-native';
import {MovieStyles} from './styles';
import ImageCarousel from './Carousel';
import {
  fetchMovieData,
  fetchMovieData1,
  kidsFetch,
  fetchMovieDatatv,
  fetchNewMovies,
} from './FetchData';
import {MovieImageCarousel, TVImageCarousel} from './GenreCarousel';
import {CompaniesCarousel} from './CompaniesCarousel';
const {height, width} = Dimensions.get('window');
export default function All({navigation, route}) {
  return (
    <View style={MovieStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: height * 0.1}}>
          {route.params.type !== 'tv' && (
            <>
              <Text style={MovieStyles.text}>Upcoming</Text>
              <ImageCarousel
                preview={false}
                type={route.params.type}
                isUpcoming={true}
                data={fetchMovieData({
                  type: route.params.type,
                  category: 'upcoming',
                  page: 1,
                })}
              />
            </>
          )}
          {route.params.type !== 'movie' && (
            <>
              <View style={{flexDirection: 'row'}}>
                <Text style={MovieStyles.text}>On air</Text>
                <Text
                  onPress={() => navigation.navigate('On Air')}
                  style={[MovieStyles.text, MovieStyles.viewAll]}>
                  View All
                </Text>
              </View>
              <ImageCarousel
                preview={false}
                type={route.params.type}
                isUpcoming
                data={fetchMovieDatatv({category: 'on_the_air', page: 1})}
              />

              <View style={{flexDirection: 'row'}}>
                <Text style={MovieStyles.text}>Airing today</Text>
                <Text
                  onPress={() => navigation.navigate('Airing Today')}
                  style={[MovieStyles.text, MovieStyles.viewAll]}>
                  View All
                </Text>
              </View>
              <ImageCarousel
                preview={false}
                type={route.params.type}
                isUpcoming={false}
                data={fetchMovieDatatv({category: 'airing_today', page: 1})}
              />
            </>
          )}
          <View style={{flexDirection: 'row'}}>
            <Text style={MovieStyles.text}>Trending Now</Text>
            <Text
              onPress={() => navigation.navigate('Trending Now')}
              style={[MovieStyles.text, MovieStyles.viewAll]}>
              View All
            </Text>
          </View>
          <ImageCarousel
            preview={false}
            type={route.params.type}
            isUpcoming={false}
            data={fetchMovieData1({
              media_type: route.params.type,
              time_window: 'day',
              category: 'trending',
              page: 1,
            })}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={MovieStyles.text}>{route.params.name}</Text>
            <Text
              onPress={() => navigation.navigate(route.params.name)}
              style={[MovieStyles.text, MovieStyles.viewAll]}>
              View All
            </Text>
          </View>
          <ImageCarousel
            preview={false}
            type={route.params.type}
            isUpcoming={false}
            data={fetchNewMovies({type: route.params.type})}
          />

          <View style={{flexDirection: 'row'}}>
            <Text style={MovieStyles.text}>Top Rated</Text>
            <Text
              onPress={() => navigation.navigate('Top Rated')}
              style={[MovieStyles.text, MovieStyles.viewAll]}>
              View All
            </Text>
          </View>
          <ImageCarousel
            preview={false}
            type={route.params.type}
            isUpcoming={false}
            data={fetchMovieData({
              type: route.params.type,
              category: 'top_rated',
              page: 1,
            })}
          />

          <View style={{flexDirection: 'row'}}>
            <Text style={MovieStyles.text}>Kids</Text>
            <Text
              onPress={() => navigation.navigate('Kids')}
              style={[MovieStyles.text, MovieStyles.viewAll]}>
              View All
            </Text>
          </View>
          <ImageCarousel
            preview={false}
            type={route.params.type}
            isUpcoming={false}
            data={kidsFetch({type: route.params.type, page: 1})}
          />

          <View style={{flexDirection: 'row'}}>
            <Text style={MovieStyles.text}>Genres</Text>
            <Text
              onPress={() => navigation.navigate('Genres')}
              style={[MovieStyles.text, MovieStyles.viewAll]}>
              View All
            </Text>
          </View>
          {route.params.type === 'movie' ? (
            <>
              <MovieImageCarousel />
            </>
          ) : (
            <>
              <TVImageCarousel />
            </>
          )}

          {route.params.type === 'movie' && (
            <>
              <Text style={MovieStyles.text}>Companies</Text>
              <CompaniesCarousel />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
