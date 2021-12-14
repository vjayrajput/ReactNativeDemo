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


            <View
                style={{
                    flexDirection: "row",
                    padding: 4
                }}
            >
                <Image
                    source={{uri: product.image}}
                    style={{width: imageWidth, height: imageHeight}}
                    PlaceholderContent={<ActivityIndicator/>}
                />

                <View
                    style={{
                        flex: 1,
                        paddingStart: 16,
                    }}
                >

                    <Text style={{
                        fontSize: 16,
                        fontWeight: "bold"
                    }}>{product.title}</Text>
                    <Text style={{
                        fontSize: 14,
                    }}>${product.price}</Text>
                    <Text style={{
                        fontSize: 12,
                    }}>{product.description}</Text>
                </View>
                <Icon
                    style={{position: 'absolute', top: 5, right: 5, marginStart: 4}}
                    name={product.isSelected ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    size={28}
                    color={product.isSelected ? '#F00' : '#000'}
                    onPress={() => this.props.onPressFavorite()}
                />
            </View>


            {product.count === 0 ?
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Button title='ADD'
                            style={{fontSize: 18}}
                            color='green'
                            disabled={product.count === 10}
                            onPress={() => this.props.onPressAdd()}/>
                </View>
                :
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    
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
    title: {
        textAlign: 'center',
        marginVertical: 15,
        fontSize: 20,
        borderBottomWidth: 2,
        paddingBottom: 15

    },
    ListItems: {
        height: '80%',
        flexDirection: "row",
        marginHorizontal: 16,

    },
    Item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottomWidth: 0.5,
        paddingBottom: 5,
        paddingTop: 5
    },
    StatusBar: {
        height: "100%",
        backgroundColor: 'red',
        padding: 15
    },
    heartIcon: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: 'flex-end',
        marginTop: -5,
        position: 'absolute', // add if dont work with above
    }

});