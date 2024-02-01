import { View, Image, ImageSourcePropType } from 'react-native';
type StickerType = ImageSourcePropType;
interface IEmojiSticker {
    stickerSource: StickerType;
}


export default function EmojiSticker({ stickerSource }: IEmojiSticker) {
    // console.log(typeof imageSize);
    return (
        <View style={{ top: -350 }}>
            <Image
                source={stickerSource}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
            />
        </View>
    )
}