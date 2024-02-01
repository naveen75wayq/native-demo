import { StyleSheet, Image, ImageSourcePropType } from 'react-native';
import * as ImagePicker from 'expo-image-picker'


type ImagePickerAsset = ImagePicker.ImagePickerAsset;
type ImageState = {
  assets: ImagePickerAsset[];
};
type placeHolderType = ImageSourcePropType;
type selectedImageType = ImageState | undefined;



interface ImageViewerProps {
    placeholderImage: placeHolderType;
    selectedImage: selectedImageType;
}

export default function ImageViewer({ placeholderImage, selectedImage }: ImageViewerProps) {
  const imageSource = selectedImage  ? { uri: selectedImage.assets[0].uri } : placeholderImage;
  return (
    <Image source={imageSource} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
