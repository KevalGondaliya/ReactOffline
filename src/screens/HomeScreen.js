import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import {FAB} from 'react-native-paper';

import Mybutton from './../components/Mybutton';
import Mytext from './../components/Mytext';
import {openDatabase} from 'react-native-sqlite-storage';
import {colors} from './../config/constant';

var db = openDatabase({name: 'UserDatabase.db'});

const HomeScreen = ({navigation}) => {
  // useEffect(() => {
  //   db.transaction(function (txn) {
  //     txn.executeSql(
  //       "SELECT name FROM sqlite_master WHERE type='table' AND name='product_table'",
  //       [],
  //       function (tx, res) {
  //         console.log('item:', res.rows.length);
  //         if (res.rows.length == 0) {
  //           txn.executeSql('DROP TABLE IF EXISTS product_table', []);
  //           txn.executeSql(
  //             'CREATE TABLE IF NOT EXISTS product_table(product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(20), small_des INT(10), original_price VARCHAR(50), discount_price VARCHAR(50), product_image VARCHAR(50), category VARCHAR(50))',
  //             [],
  //           );
  //         }
  //       },
  //     );
  //   });
  // }, []);

  let [flatListItems, setFlatListItems] = useState([]);
  let [counter, setCounter] = useState(0);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM product_table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, [flatListItems]);

  let listViewItemSeparator = () => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080',
        }}
      />
    );
  };

  let listItemView = (item) => {
    return (
      <View
        style={{flexDirection: 'row', backgroundColor: 'white', padding: 20}}>
        <View>
          <Image
            source={require('./../assets/1.jpeg')}
            style={styles.itemImg}
          />
        </View>
        <View style={styles.detailStyle}>
          <Text style={styles.productLabel}>{item.product_name}</Text>
          <Text style={styles.productSmallDec}>{item.small_des}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.dicPrice}>${item.discount_price}</Text>
            <Text style={styles.orgnlPrice}>${item.original_price}</Text>
          </View>
          <View style={styles.numericInputStyle}>
            <NumericInput
              value={counter}
              onChange={(value) => setCounter(value)}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={80}
              totalHeight={25}
              iconSize={25}
              step={1}
              valueType="real"
              rounded
              textColor={colors.black}
              iconStyle={{color: 'white'}}
              rightButtonBackgroundColor={colors.primary}
              leftButtonBackgroundColor={colors.primary}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
          <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => navigation.navigate('AddProduct')}
          />

          {/*
          <Mybutton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />*/}
          {/* <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productLabel: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.darkGray,
  },
  productSmallDec: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.darkGray,
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  dicPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.lightBlue,
    opacity: 0.7,
    letterSpacing: 0.5,
    lineHeight: 30,
  },
  orgnlPrice: {
    fontSize: 16,
    color: colors.darkGray,
    opacity: 0.7,
    marginHorizontal: 10,
    letterSpacing: 0.5,
    textDecorationLine: 'line-through',
    lineHeight: 30,
  },
  itemImg: {
    width: 130,
    height: 130,
    margin: 10,
    borderRadius: 10,
  },
  detailStyle: {
    margin: 10,
  },
  numericInputStyle: {
    marginVertical: 5,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default HomeScreen;
