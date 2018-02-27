export default (base, comin) => {
    if (base[0] === '后') return '后辈';
    let prefix = '';
    let pos = 0;
    if (base[0] === '外') {
      prefix = '外';
      pos = 1;
    }
    if (base[pos] === '孙') {
      if (comin === '儿子' || comin === '女儿') return comin === '儿子' ? `${prefix}曾孙` : `${prefix}曾孙女`;
      return comin === '丈夫' ? `${prefix}孙婿` : `${prefix}孙媳`;
    }
    if (base[pos] === '曾') {
      return '后辈';
    }
    if (comin === '儿子') {
      return base === '儿子' ? '孙子' : '外孙';
    }
    if (comin === '女儿') {
      return base === '儿子' ? '孙女' : '外孙女';
    }
    if (comin === '妻子') return '儿媳';
    if (comin === '丈夫') return '女婿';
    return '未知';
  };