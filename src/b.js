const R = require('ramda');
const log = console.log;

// binary 将任意元函数封装为二元函数（只接受2个参数）中。任何额外的参数都不会传递给被封装的函数。
const addThree = (x, y, z) => x + y + z;
const OnlyAddTwo =  R.binary(addThree);
log(OnlyAddTwo(1, 2, 3));  // NaN
log(OnlyAddTwo(1, 2));  // NaN

const addTwo = (x, y) => x + y;
const OnlyAddTwo2 =  R.binary(addTwo);
log(OnlyAddTwo2(1, 2));  // 3

// bind 创建一个绑定了上下文的函数。
// todo 没太懂这个，稍后再说

// both 类似 & 短路操作
const gt10 =  R.gt(R.__, 10); // 大于10
const lt20 =  R.lt(R.__, 20); // 小于20
const f2 = R.both(gt10, lt20);
log(f2(17)); // true
log(f2(9)); // false

