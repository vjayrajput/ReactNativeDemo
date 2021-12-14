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
                        //TODO this is dummy product id and count
                        productItem.id = this.state.dataSource.length + index + 1
                        productItem.isSelected = false
                        productItem.count = 0
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




    getBasketItems() {
        return this.state.products.filter(item => item.count);
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
        // this.state.products.forEach((item) => {
        //
        //     if (selectedItem.id === item.id) {
        //         if (type === "inc") {
        //             item.count++;
        //         } else if (item.count !== 0) {
        //             item.count--;
        //         }
        //     }
        //
        // });

        this.setState({dataSource: this.state.dataSource});
    }


    render() {
        const {dataSource, loading} = this.state

        return (
            <View style={styles.container}>

                <FlatList
                    data={dataSource}
                    renderItem={({item, index}) => <ProductItem product={item}
                                                                onPressFavorite={() => this.handlePressFavorite(item)}
                                                                onPressAdd={() => this.handlePressAdd(item, index)}
                                                                onPressRemove={() => this.handlePressRemove(item, index)}/>}
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