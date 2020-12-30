/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-picker';
import {colors} from '../config/constant';
var db = openDatabase({name: 'UserDatabase.db'});

const categoryData = [
  {label: 'Shoes', value: 'shoes'},
  {label: 'Clothes', value: 'clothes'},
  {label: 'Groom', value: 'groom'},
];

const AddProduct = ({navigation}) => {
  let [productName, setProductName] = useState('');
  let [smallDes, setSmallDes] = useState('');
  let [originalPrice, setOriginalPrice] = useState('');
  let [discountPrice, setDiscountPrice] = useState('');
  let [productImage, setProductImage] = useState('');
  console.log('productImage', productImage);
  let [category, setCategory] = useState('');

  const [filePath, setFilePath] = useState({});

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    try {
      ImagePicker.launchImageLibrary(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          // eslint-disable-next-line no-alert
          alert(response.customButton);
        } else {
          let source = response;
          setFilePath(source);
          setProductImage(source.data);
          console.log('source', source);
        }
      });
    } catch (error) {
      console.log('error', error);
    }
  };

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
    }
    if (!smallDes) {
      Toast.showWithGravity(
        'Please enter small description',
        Toast.LONG,
        Toast.TOP,
      );
      return;
    }
    if (!originalPrice) {
      Toast.showWithGravity(
        'Please enter original price',
        Toast.LONG,
        Toast.TOP,
      );
      return;
    }
    if (!discountPrice) {
      Toast.showWithGravity(
        'Please enter discount Price',
        Toast.LONG,
        Toast.TOP,
      );
      return;
    }
    if (!productImage) {
      Toast.showWithGravity(
        'Please select prodcut image',
        Toast.LONG,
        Toast.TOP,
      );
      return;
    }
    if (!category) {
      Toast.showWithGravity('Please select category', Toast.LONG, Toast.TOP);
      return;
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
            Toast.showWithGravity(
              'You are Registered Successfully',
              Toast.LONG,
              Toast.TOP,
            );
            navigation.navigate('HomeScreen');
            // Alert.alert(
            //   'Success',
            //   'You are Registered Successfully',
            //   [
            //     {
            //       text: 'Ok',
            //       onPress: () => navigation.navigate('HomeScreen'),
            //     },
            //   ],
            //   {cancelable: false},
            // );
          } else alert('Registration Failed');
        },
      );
    });
  };

  const handleChange = (selectedOption) => {
    setCategory(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding">
            <Mytextinput
              placeholder="Enter Product Name"
              onChangeText={(productName) => setProductName(productName)}
              style={styles.textInputPadding}
            />
            <Mytextinput
              placeholder="Enter Small Description"
              onChangeText={(smallDes) => setSmallDes(smallDes)}
              maxLength={10}
              style={styles.textInputPadding}
            />
            <Mytextinput
              placeholder="Enter Original Price"
              onChangeText={(originalPrice) => setOriginalPrice(originalPrice)}
              multiline={true}
              keyboardType="numeric"
              style={styles.textInputPadding}
            />

            <Mytextinput
              placeholder="Enter Discount Price"
              onChangeText={(discountPrice) => setDiscountPrice(discountPrice)}
              multiline={true}
              keyboardType="numeric"
              style={styles.textInputPadding}
            />

            <Picker
              selectedValue={category}
              style={styles.selectionDropdown}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
              {categoryData.map((cData) => {
                return <Picker.Item label={cData.label} value={cData.value} />;
              })}
            </Picker>

            <View style={styles.imageView}>
              <View style={styles.imgPreview}>
                {productImage !== '' ? (
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${productImage}`,
                    }}
                    style={styles.productImg}
                  />
                ) : (
                  <Image
                    source={require('./../assets/default.jpg')}
                    style={styles.productImg}
                  />
                )}
              </View>
              <TouchableOpacity onPress={chooseFile}>
                <View style={styles.chooseFileBtn}>
                  <Text style={styles.chooseImgText}>Choose Image</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Mybutton title="Submit" customClick={addProduct} />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInputPadding: {
    padding: 10,
  },
  productImg: {
    width: 100,
    height: 110,
    borderRadius: 10,
  },
  chooseFileBtn: {
    backgroundColor: colors.primary,
    marginVertical: 80,
    borderRadius: 50,
  },
  imgPreview: {
    marginVertical: 50,
    borderRadius: 10,
  },
  imageView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 60,
  },
  chooseImgText: {
    padding: 15,
    textAlign: 'center',
  },
  selectionDropdown: {
    marginHorizontal: 40,
    marginVertical: 10,
  },
});

export default AddProduct;
