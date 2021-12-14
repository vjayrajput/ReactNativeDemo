import React from 'react';
import {ActivityIndicator, Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import {Card, Icon, Image} from 'react-native-elements'

const win = Dimensions.get('window');

const imageWidth = win.width * 0.20

const imageHeight = imageWidth * 1.60

export default class ProductItem extends React.Component {

    render() {
        const {product} = this.props;

        return <Card style={styles.cardContainer}>

            <View style={styles.contentView}>

                <Image
                    source={{uri: product.image}}
                    style={styles.imageView}
                    PlaceholderContent={<ActivityIndicator/>}
                />

                <View style={styles.textContentView}>

                    <Text style={styles.titleView}>{product.title}</Text>

                    <Text style={styles.priceView}>₹{product.price}</Text>

                    <Text style={styles.descriptionView}>{product.description}</Text>

                </View>

                <Icon
                    name={product.isSelected ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    size={28}
                    color={product.isSelected ? '#F00' : '#000'}
                    onPress={() => this.props.onPressFavorite()}
                />
            </View>


            {product.count === 0 ?
                <View style={{width: 100}}>
                    <Button title='ADD'
                            style={{fontSize: 18}}
                            color='green'
                            disabled={product.count === 10}
                            onPress={() => this.props.onPressAdd()}/>
                </View>
                :
                <View style={{flexDirection: 'row'}}>

                    <Icon
                        style={{position: 'absolute', top: 5, right: 5, marginStart: 4}}
                        name={product.count === 10 ? 'plus-square-o' : 'plus-square'}
                        type='font-awesome'
                        size={32}
                        color={product.count === 10 ? 'grey' : 'green'}
                        onPress={() => {
                            if (product.count < 10) {
                                this.props.onPressAdd()
                            }
                        }
                        }
                    />
                    <View style={{alignItems: 'center', marginVertical: 5, marginRight: 8, marginStart: 8}}>
                        <Text style={{fontSize: 18,}}>{product.count}</Text>
                    </View>

                    <Icon
                        style={{position: 'absolute', top: 5, right: 5, marginStart: 4}}
                        name={product.count === 0 ? 'minus-square-o' : 'minus-square'}
                        type='font-awesome'
                        size={32}
                        color={product.count === 0 ? 'grey' : 'green'}
                        onPress={() => {
                            if (product.count > 0) {
                                this.props.onPressRemove()
                            }
                        }
                        }
                    />
                </View>

            }

        </Card>;
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 5, borderRadius: 12
    },
    contentView: {
        flexDirection: "row",
        padding: 4
    },
    imageView: {
        width: imageWidth, height: imageHeight
    },
    textContentView: {
        flex: 1
    },
    titleView: {
        fontSize: 16,
        marginStart: 16,
        fontWeight: "bold"
    },
    priceView: {
        fontSize: 14,
        marginStart: 16
    },
    descriptionView: {
        fontSize: 12,
        marginStart: 16
    }
});

// const styles = StyleSheet.create({
//     cardContainer: {
//         margin: 5, borderRadius: 12
//     },
//     title: {
//         textAlign: 'center',
//         marginVertical: 15,
//         fontSize: 20,
//         borderBottomWidth: 2,
//         paddingBottom: 15
//
//     },
//     ListItems: {
//         height: '80%',
//         flexDirection: "row",
//         marginHorizontal: 16,
//
//     },
//     Item: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 10,
//         borderBottomWidth: 0.5,
//         paddingBottom: 5,
//         paddingTop: 5
//     },
//     StatusBar: {
//         height: "100%",
//         backgroundColor: 'red',
//         padding: 15
//     },
//     heartIcon: {
//         ...StyleSheet.absoluteFillObject,
//         alignSelf: 'flex-end',
//         marginTop: -5,
//         position: 'absolute', // add if dont work with above
//     }
//
// });