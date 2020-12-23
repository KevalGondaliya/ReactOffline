import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';

var db = openDatabase({name: 'UserDatabase.db'});

const AddProduct = ({navigation}) => {
  let [productName, setProductName] = useState('');
  let [smallDes, setSmallDes] = useState('');
  let [originalPrice, setOriginalPrice] = useState('');
  let [discountPrice, setDiscountPrice] = useState('');
  let [productImage, setProductImage] = useState('');
  let [category, setCategory] = useState('');

  let addProduct = () => {
    console.log(
      productName,
      smallDes,
      originalPrice,
      discountPrice,
      productImage,
      category,
    );

    if (!productName) {
      Toast.showWithGravity('Please enter product name', Toast.LONG, Toast.TOP);
      return;
    } else if (!smallDes) {
      Toast.showWithGravity(
        'Please enter small description',
        Toast.LONG,
        Toast.TOP,
      );
      return;
    } else if (!originalPrice) {
      Toast.showWithGravity(
        'Please enter original price',
        Toast.LONG,
        Toast.TOP,
      );
      return;
    } else if (!discountPrice) {
      Toast.showWithGravity(
        'Please enter discount Price',
        Toast.LONG,
        Toast.TOP,
      );
      return;
    } else if (!productImage) {
      Toast.showWithGravity(
        'Please select prodcut image',
        Toast.LONG,
        Toast.TOP,
      );
      return;
    } else if (!category) {
      Toast.showWithGravity('Please select category', Toast.LONG, Toast.TOP);
      return;
    } else {
      Toast.showWithGravity('Please fill all field', Toast.LONG, Toast.TOP);
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO product_table (product_name,small_des,original_price,discount_price,product_image,category) VALUES (?,?,?,?,?,?)',
        [
          productName,
          smallDes,
          originalPrice,
          discountPrice,
          productImage,
          category,
        ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter Product Name"
                onChangeText={(productName) => setProductName(productName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Small Description"
                onChangeText={(smallDes) => setSmallDes(smallDes)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Original Price"
                onChangeText={(originalPrice) =>
                  setOriginalPrice(originalPrice)
                }
                multiline={true}
                style={{textAlignVertical: 'top', padding: 10}}
              />

              <Mytextinput
                placeholder="Enter Discount Price"
                onChangeText={(discountPrice) =>
                  setDiscountPrice(discountPrice)
                }
                multiline={true}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Select Product Image"
                onChangeText={(productImage) => setProductImage(productImage)}
                multiline={true}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Select Category"
                onChangeText={(category) => setCategory(category)}
                multiline={true}
                style={{padding: 10}}
              />
              <Mybutton title="Submit" customClick={addProduct} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddProduct;
