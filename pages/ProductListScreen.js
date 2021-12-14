import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

import ProductItem from "./ProductItem";


export default class ProductListScreen extends React.Component {

    goForFetch = () => {


        console.log(this.state.offset);

        if (!this.state.listEnded) {

            this.setState({
                fromFetch: true,
                loading: true,
                listEnded: false,
            })

            fetch("https://fakestoreapi.com/products?offset=" + this.state.offset)
                .then(response => response.json())
                .then((responseJson) => {
                    responseJson.map((productItem, index) => {
                        //TODO this is dummy product id
                        productItem.id = this.state.dataSource.length + index + 1
                        productItem.isSelected = false
                        // //TODO this is dummy condition for show default selected value
                        // if (index === 1) {
                        //     productItem.isSelected = true
                        // }
                        return productItem
                    });
                    setTimeout(() => {
                        this.setState({
                            loading: false,
                            dataSource: [...this.state.dataSource, ...responseJson],
                            offset: this.state.offset + 1,
                            listEnded: this.state.offset === 5//TODO this is dummy condition for pagination
                        })
                    }, 10)

                })
                .catch(error => console.log(error))
        } else {
            console.log('All records loaded')
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dataSource: [],
            offset: 1
        };
    }

    componentDidMount() {

        this.goForFetch();
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

    handlePressFavorite(selectedItem, index) {
        console.log("handlePressFavorite");

        this.state.dataSource[index].isSelected = !selectedItem.isSelected;
        this.setState({dataSource: this.state.dataSource});
    }

    render() {
        const {dataSource, loading} = this.state

        return (
            <View style={styles.container}>

                <FlatList
                    data={dataSource}
                    extraData={this.state}
                    renderItem={({item, index}) => <ProductItem product={item}
                                                                onPressFavorite={() => this.handlePressFavorite(item, index)}
                                                         onPressItem={() => this.navigateProductDetail(item)}
                                                         onPressAdd={() => this.handlePressAdd(item)}
                                                         onPressRemove={() => this.handlePressRemove(item)}/>}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.goForFetch}
                    onEndReachedThreshold={1}
                />

                {loading &&
                <View>
                    <ActivityIndicator size="large" color="#0c9"/>
                </View>
                }
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