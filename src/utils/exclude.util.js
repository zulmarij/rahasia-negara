const exclude = (data, values) => {
  if (Array.isArray(data)) {
    // Jika data adalah array, kembalikan elemen-elemen yang tidak memiliki nilai yang ada dalam array values
    return data.filter((item) => !values.includes(item));
  } else if (typeof data === 'object' && data !== null) {
    // Jika data adalah objek, kembalikan properti-properti yang tidak dipilih berdasarkan kunci
    const excludedObject = { ...data };
    for (const key of values) {
      if (Object.hasOwnProperty.call(excludedObject, key)) {
        delete excludedObject[key];
      }
    }
    return excludedObject;
  } else {
    return data;
  }
};

module.exports = exclude;
