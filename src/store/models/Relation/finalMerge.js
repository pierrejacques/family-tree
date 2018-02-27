import { EHOSTUNREACH } from "constants";

const mergeBridgeDown = (bridge, down)=> {
  if (bridge && down) {
    const link = bridge[0] === '亲' || bridge[0] === '堂';
    const gender = bridge[1] === '兄' || bridge[1] === '弟';
    const sort = bridge[1] === '兄' || bridge[1] === '姐';
    const map = new Map([
      ['儿子', link ? gender ? '侄子' : '外甥' : gender ? '表侄' : '表外甥'],
      ['女儿', link ? gender ? '侄女' : '外甥女' : gender ? '表侄女' : '表外甥女'],
      ['妻子', sort ? '嫂子' : '弟媳'],
      ['丈夫', sort ? '姐夫' : '妹夫'],
      ['儿媳', link ? gender ? '侄媳' : '甥媳' : gender ? '表侄媳' : '表甥媳'],
      ['女婿', link ? gender ? '侄婿' : '甥婿' : gender ? '表侄婿' : '表甥婿'],

      ['孙子', gender ? '侄孙' : '甥孙'],
      ['孙女', gender ? '侄孙女' : '甥孙女'],
      ['外孙', gender ? '侄外孙' : '甥外孙'],
      ['孙婿', gender ? '侄孙婿' : '甥孙媳'],
      ['外孙婿', gender ? '侄外孙婿' : '甥外孙婿'],
      ['孙媳', gender ? '侄孙媳' : '甥孙媳'],
      ['外孙媳', gender ? '侄外孙媳' : '甥外孙媳'],

      ['曾孙', gender ? '侄孙' : '甥孙'],
      ['外曾孙', gender ? '侄外孙' : '甥外孙'],
      ['曾孙女', gender ? '侄孙女' : '甥孙女'],
      ['外曾孙女', gender ? '侄外孙女' : '甥外孙女'],
    ]);
    return map.get(down) || down;
  }
  return bridge || down;
}

const mergeUpPost = (up, post) => {
  if (up && post) {
    if (up[0] === '先') return '先祖';
    let prefix = '', pos = 0;
    if (up[0] === '外') {
      prefix = '外';
      pos = 1;
    }
    if (up[pos] === '曾') { // 简易
      return up;
    }
    if (up === '祖父') {
      const map = {
        亲兄: '伯祖',
        堂兄: '伯祖',
        表兄: '伯祖',
        亲弟: '叔祖',
        堂弟: '叔祖',
        表弟: '叔组',
        亲姐: '姑奶',
        堂姐: '姑奶',
        表姐: '姑奶',
        亲妹: '姑奶',
        堂妹: '姑奶',
        表妹: '姑奶',
        嫂子: '大奶奶',
        弟媳: '小奶奶',
        妹夫: '小爷爷',
        姐夫: '大爷爷',
      };
      return map[post] || up;
    }
    if (up === '祖母') {
      const map = {
        亲兄: '舅公',
        堂兄: '舅公',
        表兄: '舅公',
        亲弟: '舅公',
        堂弟: '舅公',
        表弟: '舅公',
        亲姐: '娘婆',
        堂姐: '娘婆',
        表姐: '娘婆',
        亲妹: '娘婆',
        堂妹: '娘婆',
        表妹: '娘婆',
        嫂子: '未知',
        弟媳: '未知',
        妹夫: '未知',
        姐夫: '未知',
      };
      return map[post] || up;
    }
    if (up === '外祖父') {
      const map = {
        亲兄: '外祖父',
        堂兄: '外祖父',
        表兄: '外祖父',
        亲弟: '外祖父',
        堂弟: '外祖父',
        表弟: '外祖父',
        亲姐: '外祖母',
        堂姐: '外祖母',
        表姐: '外祖母',
        亲妹: '外祖母',
        堂妹: '外祖母',
        表妹: '外祖母',
        嫂子: '未知',
        弟媳: '未知',
        妹夫: '未知',
        姐夫: '未知',
      };
      return map[post] || up;
    }
    if (up === '外祖母') {
      const map = {
        亲兄: '舅老爷',
        堂兄: '舅老爷',
        表兄: '舅老爷',
        亲弟: '舅老爷',
        堂弟: '舅老爷',
        表弟: '舅老爷',
        亲姐: '舅姥',
        堂姐: '舅姥',
        表姐: '舅姥',
        亲妹: '舅姥',
        堂妹: '舅姥',
        表妹: '舅姥',
        嫂子: '未知',
        弟媳: '未知',
        妹夫: '未知',
        姐夫: '未知',
      };
      return map[post] || up;
    }
    if (up === '父亲') {
      const map = {
        亲兄: '伯父',
        堂兄: '伯父',
        表兄: '伯父',
        亲弟: '叔父',
        堂弟: '叔父',
        表弟: '叔父',
        亲姐: '姑母',
        堂姐: '姑母',
        表姐: '姑母',
        亲妹: '姑母',
        堂妹: '姑母',
        表妹: '姑母',
        嫂子: '婶母',
        弟媳: '婶母',
        妹夫: '叔叔',
        姐夫: '伯父',
      };
      return map[post] || up;
    }
    if (up === '母亲') {
      const map = {
        亲兄: '舅舅',
        堂兄: '舅舅',
        表兄: '表舅',
        亲弟: '舅舅',
        堂弟: '舅舅',
        表弟: '表舅',
        亲姐: '姨母',
        堂姐: '姨母',
        表姐: '姨母',
        亲妹: '姨母',
        堂妹: '姨母',
        表妹: '姨母',
        嫂子: '舅妈',
        弟媳: '舅妈',
        妹夫: '姨夫',
        姐夫: '姨夫',
      };
      return map[post] || up;
    }
  }
  return up || post;
};

export default (up = '', bridge = '', down = '') => {
  // 易于判断的特例
  if (up[0] === '先') return '先祖';
  if (down[0] === '后') return '后辈';
  if (up && !bridge && down) { // FIXME: 未来可能出现：儿媳、女婿、丈人等，当前不考虑
    return up.indexOf('母') !== -1 ? up.replace('母', '父') : up.replace('父', '母');
  }
  // 合并bridge和down
  const postComb = mergeBridgeDown(bridge, down);
  // 合并up和post
  return mergeUpPost(up, postComb) || '未知';
};