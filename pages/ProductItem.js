import React from 'react';
import {ActivityIndicator, Button, Dimensions, Text, View} from 'react-native';
import {Card, Image} from 'react-native-elements'

const win = Dimensions.get('window');

const imageWidth = win.width * 0.40

const imageHeight = imageWidth * 1.50

export default class ProductItem extends React.Component {

    render() {
        const {product} = this.props;

        return <Card containerStyle={{padding: 10, borderRadius: 12}}>


            <Image
                source={{uri: product.image}}
                style={{width: imageWidth, height: imageHeight}}
                PlaceholderContent={<ActivityIndicator/>}
            />

            <View onTouchEnd={() => this.props.onPressItem()}
                  style={{justifyContent: 'flex-start', flex: 1}}>

                <Text style={{fontSize: 18}}>{product.title}</Text>

            </View>

            <View style={{flexDirection: 'row'}}>
                <View style={{marginRight: 5}}>
                    <Button title='+ADD'
                            style={{fontSize: 18}}
                            color='green'
                            disabled={product.count === 10}
                            onPress={() => this.props.onPressAdd()}/>
                </View>
                <View style={{alignItems: 'center', marginVertical: 5, marginRight: 5}}>
                    <Text style={{fontSize: 18,}}>{product.count}</Text>
                </View>
                <Button
                    title='-REMOVE'
                    style={{fontSize: 18}}
                    color='darkorange'
                    disabled={!product.count}
                    onPress={() => this.props.onPressRemove()}/>
            </View>

        </Card>;
    }
}