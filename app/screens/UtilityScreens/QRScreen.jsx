import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { themes } from '../../utils/theme';

const theme = themes.dark;

const QRScreen = () => {
  const [qrUri, setQrUri] = useState(null);
  const [fullscreenVisible, setFullscreenVisible] = useState(false);
  const lastTap = useRef(null);

  useEffect(() => {
    loadQrImage();
  }, []);

  const loadQrImage = async () => {
    const savedUri = await AsyncStorage.getItem('qrImage');
    if (savedUri) setQrUri(savedUri);
  };

  const selectImage = async () => {
    launchImageLibrary({ mediaType: 'photo' }, async (res) => {
      if (res.assets && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        await AsyncStorage.setItem('qrImage', uri);
        setQrUri(uri);
      }
    });
  };

  const handleImageTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      // Double tap detected
      setFullscreenVisible(true);
    } else {
      lastTap.current = now;
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Your QR Code</Text>

          {qrUri ? (
            <>
              <TouchableOpacity activeOpacity={0.9} onPress={handleImageTap}>
                <Image source={{ uri: qrUri }} style={styles.qrImage} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={selectImage}>
                <Text style={styles.buttonText}>Change QR Image</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.infoText}>No QR Code found</Text>
              <TouchableOpacity style={styles.button} onPress={selectImage}>
                <Text style={styles.buttonText}>Upload from Gallery</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Fullscreen Modal */}
      <Modal
        visible={fullscreenVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFullscreenVisible(false)}
      >
        <Pressable style={styles.modalContainer} onPress={() => setFullscreenVisible(false)}>
          <Image source={{ uri: qrUri }} style={styles.fullscreenImage} resizeMode="contain" />
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: theme.cardBackground,
    padding: 24,
    borderRadius: 20,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    color: theme.textPrimary,
    fontSize: 22,
    fontFamily: theme.fontFamily,
    marginBottom: 16,
  },
  infoText: {
    color: theme.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: theme.fontFamily,
    marginBottom: 20,
  },
  qrImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: theme.primary,
  },
  button: {
    backgroundColor: theme.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: theme.textPrimary,
    fontWeight: '600',
    fontFamily: theme.fontFamily,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000DD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
});

export default QRScreen;
