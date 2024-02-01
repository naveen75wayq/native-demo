import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker'
import { SetStateAction, useState } from 'react';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from './components/EmojiPicker';
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';

const placeholderImage = require('./assets/background-image.png');
type ImagePickerAsset = ImagePicker.ImagePickerAsset;

type ImageState = {
  assets: ImagePickerAsset[];
};

export default function App() {
  const [selectedImage, setSelectedImage] = useState<ImageState | undefined>(undefined);
  const [pickedEmoji, setSelectedEmoji] = useState<ImageState | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean | undefined>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const onReset = () => {
    console.log('onReset clicked');
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
      setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };
  const onMondalClose = () => {
    setIsModalVisible(false);
  }
  
  const hideAppOptions = () => {
    setShowAppOptions(true);
  }
  const pickImageAsync = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      })
      if (!image.canceled) {
        // console.log(image)
        const newImage: ImagePickerAsset = {
          uri: image.assets[0].uri,
          width: image.assets[0].width ?? 0,
          height: image.assets[0].height ?? 0,
          // Add other properties as needed
        };

        setSelectedImage((prevImageState) => ({
          ...prevImageState,
          assets: [newImage, ...(prevImageState?.assets ?? [])] as ImagePickerAsset[],
        }));
        setShowAppOptions(true);
        // console.log(selectedImage);
      } else {
        throw new Error('You did not select an image')
      }
    } catch (error: any) {
      console.error(`Failed to upload image:  ${error.message}`)
    }
  }
  console.log(pickedEmoji)
  return (

    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImage={placeholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker stickerSource={{uri: pickedEmoji.assets[0].uri}}/>}
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon='refresh' label='Reset' onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon='save-alt' label='Save' onPress={() => { }} />
          </View>
        </View>
      ) : (
        // options buttons
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button theme='' label="Use this photo" onPress={hideAppOptions} />
        </View>
        
      )}

      {/* emoji selection */}
      <EmojiPicker isVisible={isModalVisible} onClose={onMondalClose}>
            <EmojiList onModalClose={onMondalClose} onSelect={setSelectedEmoji} />
        </EmojiPicker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  textContainer: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
  ,
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});