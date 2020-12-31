import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import NumericInput from 'react-native-numeric-input';
import Toast from 'react-native-simple-toast';
import {openDatabase} from 'react-native-sqlite-storage';
import {colors} from './../config/constant';

var db = openDatabase({name: 'UserDatabase.db'});

const HomeScreen = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let [counter, setCounter] = useState(0);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM cart_table', [], (tx, results) => {
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

  const deleteUser = (item) => {
    let items = item.item;
    Alert.alert(
      'Success',
      'Are you want to delete this product ?',
      [
        {
          text: 'Ok',
          onPress: () => {
            db.transaction((tx) => {
              tx.executeSql(
                'DELETE FROM  cart_table where product_id=?',
                [items.product_id],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    Toast.showWithGravity(
                      'Product deleted successfully',
                      Toast.LONG,
                      Toast.TOP,
                    );
                  } else {
                    alert('Please insert a valid User Id');
                  }
                },
              );
            });
          },
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Ok'),
        },
      ],
      {cancelable: false},
    );
  };

  let listItemView = (item) => {
    return (
      <View>
        <View style={styles.mainView}>
          <View>
            {item && item.productImage !== '' ? (
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${item.product_image}`,
                }}
                style={styles.itemImg}
              />
            ) : (
              <Image
                source={require('./../assets/default.jpg')}
                style={styles.itemImg}
              />
            )}
          </View>
          <View style={styles.detailStyle}>
            <Text style={styles.productLabel}>{item.product_name}</Text>
            <Text style={styles.productSmallDec}>{item.small_des}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.dicPrice}>${item.discount_price}</Text>
              <Text style={styles.orgnlPrice}>${item.original_price}</Text>
              {/* <Text style={styles.orgnlPrice}>
                ${parseInt(item.item_counter)}
              </Text> */}
              {/* <Text style={styles.orgnlPrice}>${item.product_id}</Text> */}
            </View>
            <View>
              <Text style={styles.quantityText}>
                Quantity :{' '}
                {parseInt(item.item_counter) > 0
                  ? parseInt(item.item_counter)
                  : 1}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              {/* <View style={styles.numericInputStyle}>
                <NumericInput
                  initValue={parseInt(item.item_counter)}
                  value={counter}
                  onChange={(value) => setCounter(value)}
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  totalWidth={80}
                  totalHeight={30}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor={colors.black}
                  iconStyle={{color: 'white'}}
                  rightButtonBackgroundColor={colors.primary}
                  leftButtonBackgroundColor={colors.primary}
                />
              </View> */}
              <TouchableOpacity onPress={() => deleteUser({item})}>
                <View style={styles.addCartBtn}>
                  <Text style={styles.addCartText}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1}}>
        {flatListItems.length > 0 ? (
          <View style={{flex: 1}}>
            <FlatList
              data={flatListItems}
              ItemSeparatorComponent={listViewItemSeparator}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => listItemView(item)}
            />

            <View style={styles.itemTotal}>
              <View style={styles.yourSaleStyle}>
                <Text style={styles.yourSaleText}>Your Sale</Text>
                <Text style={styles.yourSalePrice}>{flatListItems.length}</Text>
              </View>
              <View style={styles.yourSaleStyle}>
                <Text style={styles.yourSaleText}>Sub Total</Text>
                <Text style={styles.yourSalePrice}>
                  $
                  {_.sumBy(flatListItems, function (o) {
                    let sumData = parseInt(
                      o.discount_price *
                        (o.item_counter > 0 ? o.item_counter : 1),
                    );
                    return sumData;
                  })}
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log('checkout')}>
                <Text style={styles.text}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <Image
              source={require('./../assets/emptyCart.png')}
              style={styles.emptyCartImg}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
  },
  productLabel: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.darkGray,
  },
  productSmallDec: {
    fontSize: 18,
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
    height: 150,
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
  yourSaleStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    padding: 30,
  },
  yourSaleText: {
    color: colors.darkGray,
    fontSize: 20,
    fontWeight: '700',
  },
  itemTotal: {
    // marginVertical: 100,
    marginHorizontal: 30,
  },
  addCartBtn: {
    // marginHorizontal: 15,
    marginVertical: 7,
  },
  addCartText: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.primary,
    borderRadius: 4,
    color: colors.white,
  },
  yourSalePrice: {
    color: colors.lightBlue,
    fontSize: 20,
    fontWeight: '700',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.darkBrown,
    color: 'red',
    padding: 15,
    marginVertical: 35,
    marginHorizontal: 35,
    borderRadius: 25,
  },
  text: {
    color: '#ffffff',
  },
  emptyCartImg: {
    // width: 100,
    width: 'auto',
    // height: 130,
    marginVertical: '10%',
    borderRadius: 10,
  },
  quantityText: {
    color: colors.darkGray,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;
