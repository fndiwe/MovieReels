import React, {useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import {MovieStyles, styles, PreviewStyles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {height, width} = Dimensions.get('window');
import Share from 'react-native-share';
export default function Menu({navigation}) {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showApps, setShowApps] = useState(false);
  const APP_URL =
    'https://play.google.com/store/apps/details?id=com.franklinndiwe.moviereels';
  const handleShare = async () => {
    const shareOptions = {
      title: 'Share Movie Reels',
      message:
        'Download Movie Reels to watch up to 5million+ exciting Movies and TV series, get information about your favorite characters and other exciting features waiting for you😊.',
      url: APP_URL,
    };
    await Share.open(shareOptions);
  };
  return (
    <View style={MovieStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[MovieStyles.text, {marginBottom: 0}]}>Menu</Text>
        <Image
          style={PreviewStyles.logo}
          source={require('../assets/images/logo.png')}
        />
        <View style={{marginTop: height * 0.04}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowAbout(!showAbout)}
            style={styles.button}>
            <Icon size={height * 0.035} color="white" name="fact-check" />
            <Text style={[styles.text, {marginBottom: 5}]}>About </Text>
            {!showAbout ? (
              <Icon size={height * 0.045} color="white" name="arrow-right" />
            ) : (
              <Icon
                size={height * 0.045}
                color="white"
                name="arrow-drop-down"
              />
            )}
          </TouchableOpacity>
          {showAbout && (
            <Text style={[PreviewStyles.genreText, {padding: 10}]}>
              Movie Reels is a movie streaming app proudly designed, developed
              and owned by Franklin Ndiwe. {'\nData source: '}
              <Text
                onPress={() => Linking.openURL('https://tmdb.org')}
                style={{color: 'blue'}}>
                tmdb.org
              </Text>
            </Text>
          )}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={() => Linking.openURL(APP_URL)}>
            <Icon size={height * 0.045} color="white" name="star-rate" />
            <Text style={styles.text}>Rate App</Text>
            <Text style={styles.text}>{'  '}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={() => handleShare()}>
            <Icon size={height * 0.045} color="white" name="share" />
            <Text style={styles.text}>Share App</Text>
            <Text style={styles.text}>{'  '}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setShowContact(!showContact)}
            style={styles.button}>
            <Icon size={height * 0.045} color="white" name="contact-support" />
            <Text style={styles.text}>Contact Me </Text>
            {!showContact ? (
              <Icon size={height * 0.045} color="white" name="arrow-right" />
            ) : (
              <Icon
                size={height * 0.045}
                color="white"
                name="arrow-drop-down"
              />
            )}
          </TouchableOpacity>
          {showContact && (
            <>
              <Text style={[PreviewStyles.genreText, {padding: 10}]}>
                For feature request, sponsorship, bug report and others. Contact
                me through any means below.
              </Text>

              <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    Linking.openURL(
                      'https://www.facebook.com/profile.php?id=100044267295373',
                    )
                  }>
                  <Image
                    style={styles.socialIcon}
                    source={require('../assets/images/facebook.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    Linking.openURL('https://wa.me/+2348171368002')
                  }>
                  <Image
                    style={styles.socialIcon}
                    source={require('../assets/images/whatsapp.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() =>
                    Linking.openURL('mailto: franklinchidex42@gmail.com')
                  }>
                  <Image
                    style={styles.socialIcon}
                    source={require('../assets/images/gmail.png')}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={() => Linking.openURL(APP_URL)}>
            <Icon size={height * 0.045} color="white" name="upgrade" />
            <Text style={styles.text}>Update App</Text>
            <Text style={styles.text}>{'  '}</Text>
          </TouchableOpacity>
          <View style={{marginBottom: height * 0.03}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setShowApps(!showApps)}
              style={styles.button}>
              <Icon size={height * 0.045} color="white" name="apps" />
              <Text style={styles.text}>My other apps </Text>
              {!showApps ? (
                <Icon size={height * 0.045} color="white" name="arrow-right" />
              ) : (
                <Icon
                  size={height * 0.045}
                  color="white"
                  name="arrow-drop-down"
                />
              )}
            </TouchableOpacity>
            {showApps && (
              <>
                <Text style={[PreviewStyles.genreText, {padding: 10}]}>
                  Please check out my other apps on playstore.
                </Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      Linking.openURL(
                        'https://play.google.com/store/apps/details?id=com.franklinndiwe.magikboxx',
                      )
                    }>
                    <Image
                      style={styles.socialIcon}
                      source={require('../assets/images/magikboxx.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      Linking.openURL(
                        'https://play.google.com/store/apps/details?id=com.franklinndiwe.triviahq',
                      )
                    }>
                    <Image
                      style={styles.socialIcon}
                      source={require('../assets/images/triviahq.png')}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>

          <Text style={{textAlign: 'center', marginBottom: height * 0.1}}>
            Version 1.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
