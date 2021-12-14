import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements'

import ProductItem from "./ProductItem";


export default class ProductListScreen extends React.Component {

    goForFetch = () => {

        console.log(this.state.offset);

        if (!this.state.listEnded) {

            this.setState({
                fromFetch: true,
                loading: true,
                listEnded: false
            });

            fetch("https://fakestoreapi.com/products?offset=" + this.state.offset)
                .then(response => response.json())
                .then((responseJson) => {
                    responseJson.map((productItem, index) => {
                        /**
                         * this is dummy product id and count
                         */
                        productItem.id = this.state.dataSource.length + index + 1;
                        productItem.isSelected = false;
                        productItem.count = 0;
                        return productItem
                    });
                    setTimeout(() => {
                        this.setState({
                            loading: false,
                            dataSource: [...this.state.dataSource, ...responseJson],
                            offset: this.state.offset + 1,
                            listEnded: this.state.offset === 5//this is dummy condition for pagination end
                        })
                    }, 10)
                })
                .catch(error => console.log(error))
        } else {
            console.log('All records loaded')
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            offset: 1,
            totalItem: 0,
            totalPrice: 0
        };
    }

    componentDidMount() {
        this.goForFetch();
    }


    handlePressFavorite(selectedItem) {
        console.log("handlePressFavorite");
        selectedItem.isSelected = !selectedItem.isSelected;
        this.setState({dataSource: this.state.dataSource});
    }

    handlePressAdd(selectedItem, index) {
        console.log("handlePressAdd");
        this.updateItemCount(selectedItem, index, 'inc');
    }

    handlePressRemove(selectedItem, index) {
        console.log("handlePressRemove");
        this.updateItemCount(selectedItem, index, 'dec');
    }

    updateItemCount(selectedItem, index, type) {
        if (type === "inc") {
            selectedItem.count++;
        } else if (selectedItem.count !== 0) {
            selectedItem.count--;
        }
        this.setState({dataSource: this.state.dataSource});
        this.updateCartData()
    }

    updateCartData() {
        let items = 0;
        let prices = 0;

        this.state.dataSource.filter(product => product.count !== 0).map(filteredProduct => {
            items = items + filteredProduct.count;
            prices = prices + (filteredProduct.count * filteredProduct.price);
        });

        this.setState({
            totalItem: items,
            totalPrice: prices,
        })
    }

    render() {
        return (
            <View style={styles.container}>

                {
                    this.state.dataSource.length > 0 ?
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({item, index}) => <ProductItem product={item}
                                                                        onPressFavorite={() => this.handlePressFavorite(item)}
                                                                        onPressAdd={() => this.handlePressAdd(item, index)}
                                                                        onPressRemove={() => this.handlePressRemove(item, index)}/>}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReached={this.goForFetch}
                            onEndReachedThreshold={0.5}
                        />
                        : null
                }

                {this.state.loading ?
                    <View>
                        <ActivityIndicator size="large" color="#0c9"/>
                    </View> : null
                }

                {this.state.totalItem !== 0 ? <View style={styles.cartView}>
                    <Icon
                        style={styles.cartIcon}
                        name='cart-plus'
                        type='font-awesome'
                        size={28}
                        color='#FFF'
                    />
                    <View>
                        <Text style={styles.itemText}>Items : {this.state.totalItem}</Text>
                        <Text style={styles.priceText}>Total : ₹{this.state.totalPrice.toFixed(2)}</Text>
                    </View>
                </View> : null}


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    cartView: {
        flexDirection: "row",
        padding: 8,
        backgroundColor: 'lightslategrey',
        margin: 16,
        borderRadius: 4
    },
    cartIcon: {top: 5, right: 5, marginStart: 4},
    itemText: {
        marginStart: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    },
    priceText: {
        marginStart: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: 'white'
    }
});