import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'UserDatabase.db'});

const AddProduct = ({navigation}) => {
  let [productName, setProductName] = useState('');
  let [smallDes, setSmallDes] = useState('');
  let [originalPrice, setOriginalPrice] = useState('');
  let [discountPrice, setDiscountPrice] = useState('');
  let [productImg, setProductImg] = useState('');
  let [productImgPreview, setProductImgPreview] = useState('');
  let [category, setCategory] = useState('');

  let addProduct = () => {
    console.log(
      productName,
      smallDes,
      originalPrice,
      discountPrice,
      productImg,
      productImgPreview,
      category,
    );

    if (!productName) {
      alert('Please fill name');
      return;
    }
    if (!smallDes) {
      alert('Please fill Contact Number');
      return;
    }
    if (!originalPrice) {
      alert('Please fill Contact Number');
      return;
    }
    if (!discountPrice) {
      alert('Please fill Contact Number');
      return;
    }
    if (!productImg) {
      alert('Please fill Contact Number');
      return;
    }
    if (!productImgPreview) {
      alert('Please fill Contact Number');
      return;
    }
    if (!category) {
      alert('Please fill Contact Number');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (productName,smallDes,originalPrice,discountPrice,productImg,productImgPreview,category) VALUES (?,?,?,?,?,?,?)',
        [
          productName,
          smallDes,
          originalPrice,
          discountPrice,
          productImg,
          productImgPreview,
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
                placeholder="Enter Small Disc."
                onChangeText={(smallDes) => setSmallDes(smallDes)}
                maxLength={10}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Original Price"
                onChangeText={(originalPrice) =>
                  setOriginalPrice(originalPrice)
                }
                maxLength={10}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Discount Price"
                onChangeText={(discountPrice) =>
                  setDiscountPrice(discountPrice)
                }
                maxLength={10}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Product Image"
                onChangeText={(productImg) => setProductImg(productImg)}
                maxLength={10}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={(productImgPreview) =>
                  setProductImgPreview(productImgPreview)
                }
                maxLength={10}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={(category) => setCategory(category)}
                maxLength={10}
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
