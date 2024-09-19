const pick = (data, values) => {
  if (Array.isArray(data)) {
    // Jika data adalah array, kembalikan elemen-elemen yang memiliki nilai yang ada dalam array values
    return data.filter((item) => values.includes(item));
  } else if (typeof data === 'object' && data !== null) {
    // Jika data adalah objek, kembalikan properti-properti yang dipilih berdasarkan kunci
    return values.reduce((finalObj, key) => {
      if (Object.hasOwnProperty.call(data, key)) {
        finalObj[key] = data[key];
      }
      return finalObj;
    }, {});
  } else {
    return null;
  }
};

module.exports = pick;
