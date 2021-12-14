import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

export default class HomeScreen extends React.Component {

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.mainContainer}>
                <Button
                    title="Product List"
                    onPress={() => navigate('ProductList')}
                />
            </View>
        );
    }


}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, alignItems: 'center',
        justifyContent: 'center'
    }
});