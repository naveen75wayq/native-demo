import { SetStateAction, useState } from 'react';
import { StyleSheet, FlatList, Image, Platform, Pressable, ImageSourcePropType} from 'react-native';
interface IEmojiList {
    onSelect: any;
    onModalClose: () => void;
}
import emoji1 from '../assets/emoji1.png'
import emoji2 from '../assets/emoji2.png'
import emoji3 from '../assets/emoji3.png'
import emoji4 from '../assets/emoji4.png'
import emoji5 from '../assets/emoji5.png'
import emoji6 from '../assets/emoji6.png'
export default function EmojiList({ onSelect, onModalClose }: IEmojiList) {
    const [emoji] = useState<ImageSourcePropType[]>([
        emoji1,
        emoji2,
        emoji3,
        emoji4,
        emoji5,
        emoji6
    ])

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web' ? true : false}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item, index }) => {
                return (
                    <Pressable
                        onPress={() => {
                            onSelect(item);
                            onModalClose();
                        }}>
                        <Image source={item} key={index} style={styles.image} />
                    </Pressable>
                )
            }}
        />
    )
}
const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});