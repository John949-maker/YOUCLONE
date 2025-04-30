 export const API_KEY = 'AIzaSyCWlf3PidF1RR8dJmma2Jna_7_1_0pLHCk';

 export const value_converter = (value) => {
    if (value >= 1000000) {
      return Math.floor(value / 1000000) + "M";
    } else if (value >= 1000) {
      return Math.floor(value / 1000) + "K";
    } else {
      return value;
    }
  }

  
  