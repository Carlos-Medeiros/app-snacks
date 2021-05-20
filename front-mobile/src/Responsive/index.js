import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const widthToDP = number => {
    let givenWidth = typeof number ==='number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);

};

const heightToDP = number => {
    let givenHeigth = typeof number ==='number' ? number : parseFloat(number);
    if (parseInt(height) >= 731) {
      return PixelRatio.roundToNearestPixel((height * (givenHeigth * (height / 731))) / 100);
    }
    if (parseInt(height) <= 731) {
      return PixelRatio.roundToNearestPixel((height * (givenHeigth * (731 / height))) / 100);
    }
};

export {widthToDP, heightToDP};