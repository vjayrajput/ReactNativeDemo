import React from 'react';
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View,Dimensions} from 'react-native';

const win = Dimensions.get('window');

const imageWidth = win.width*0.40

const imageHeight = imageWidth*1.50

import {Card, Image} from 'react-native-elements'

import productItems from '../mocks/products';

const getFakeProductList = () => {
    return fetch('https://fakestoreapi.com/products')
        .then(response=>response.json())
        .then(json=>console.log("my json list : "+json))
        .catch((error) => {
            console.error(error);
        });
};

class ProductListItem extends React.Component {

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


export default class ProductListScreen extends React.Component {
    static navigationOptions = {
        title: 'Product List',
    };

    state = {
        products: productItems
    }



    updateItemCount(selectedItem, type) {
        this.state.products.forEach((item) => {

            if (selectedItem.id === item.id) {
                if (type === "inc") {
                    item.count++;
                } else if (item.count !== 0) {
                    item.count--;
                }
            }


        });

        this.setState({products: this.state.products});
    }

    handlePressAdd(selectedItem) {
        this.updateItemCount(selectedItem, 'inc');
    }

    handlePressRemove(selectedItem) {
        this.updateItemCount(selectedItem, 'dec');
    }

    navigateProductDetail(item) {

        const {navigate} = this.props.navigation;

        // navigate('ProductDetail', { product: item});

    }

    getBasketItems() {
        return this.state.products.filter(item => item.count);
    }


    render() {


        return (
            <View style={styles.container}>


                <FlatList
                    data={this.state.products}
                    renderItem={({item}) => <ProductListItem product={item}
                                                             onPressItem={() => this.navigateProductDetail(item)}
                                                             onPressAdd={() => this.handlePressAdd(item)}
                                                             onPressRemove={() => this.handlePressRemove(item)}/>}
                    keyExtractor={item => item.id.toString()}
                />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

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
    }

});