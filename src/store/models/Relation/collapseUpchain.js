export default (base, comin) => {
  if (base[0] === '先') {
    return '先祖';
  }
  let prefix = '';
  let pos = 0;
  if (base[0] === '外') {
    prefix = '外';
    pos = 1;
  }
  if (base[pos] === '祖') {
    return comin === '父亲' ? `${prefix}曾祖父` : `${prefix}曾祖母`; 
  }
  if (base[pos] === '曾') {
    return '先祖';
  }
  if (comin === '父亲') {
    switch(base) {
      // case '丈夫':
      //   return '公公';
      // case '妻子':
      //   return '丈人';
      // case '公公':
      //   return '祖父';
      // case '婆婆':
      //   return '外祖父';
      // case '丈人':
      //   return '祖父';
      // case '丈母娘':
      //   return '外祖父';
      case '父亲':
        return '祖父';
      case '母亲':
        return '外祖父';
    };
  }
  if (comin === '母亲') {
    switch(base) {
      // case '丈夫':
      //   return '婆婆';
      // case '妻子':
      //   return '丈母娘';
      // case '公公':
      //   return '祖母';
      // case '婆婆':
      //   return '外祖母';
      // case '丈人':
      //   return '祖母';
      // case '丈母娘':
      //   return '外祖母';
      case '父亲':
        return '祖母';
      case '母亲':
        return '外祖母';
    };
  }
  return '未知';
};