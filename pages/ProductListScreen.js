//import React from 'react';
import React from 'react';
import {ActivityIndicator, Dimensions, FlatList, StyleSheet, View} from 'react-native';
import ProductItem from "./ProductItem";

const win = Dimensions.get('window');

const imageWidth = win.width * 0.40

const imageHeight = imageWidth * 1.50


export default class ProductListScreen extends React.Component {

    static navigationOptions = {
        title: 'Product List',
    };


    goForFetch = () => {
        console.log(this.state.offset);
        this.setState({
            fromFetch: true,
            loading: true,

        })

        fetch("https://fakestoreapi.com/products?offset=" + this.state.offset)
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch', responseJson)
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        dataSource: responseJson,
                        offset: this.state.offset + 1
                    })
                }, 10)

            })
            .catch(error => console.log(error))

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


    render() {
        const {dataSource, fromFetch, fromAxios, loading, axiosData} = this.state

        return (
            <View style={styles.container}>

                <FlatList
                    data={dataSource}
                    renderItem={({item}) => <ProductItem product={item}
                                                         onPressItem={() => this.navigateProductDetail(item)}
                                                         onPressAdd={() => this.handlePressAdd(item)}
                                                         onPressRemove={() => this.handlePressRemove(item)}/>}
                    keyExtractor={item => item.id.toString()}
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