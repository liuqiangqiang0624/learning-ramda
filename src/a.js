const R = require('ramda');
const log = console.log;
// add 两数相加。
// 返回 number
log('add ---------------------------');
R.add(2)(3);
log(R.add(2)(3)); // 3

// adjust  将数组中指定索引处的值替换为经函数变换的值。
// 返回 array
log('adjust ---------------------------');
const a = ['a', 'b', 'c'];
const a1 = R.adjust(2, (x) => x + '11111' , a);
const a2 = R.adjust(2, R.toUpper, a);
log(a1); // [ 'a', 'b', 'c11111' ]
log(a2); // [ 'a', 'b', 'C' ]


// all   是否所有的元素都满足某一个条件
// 返回 boolean
log('all ---------------------------');
const myfilter = R.equals(3);
const a3 = R.all(myfilter)([1, 2, 3]); 
const a4 = R.all(myfilter)([3, 3, 3]); 
const a5 = R.all(myfilter)([3, 3, '3']); 
log(a3); // false
log(a4); // true
log(a5); // false 恒等


// propEq  如果指定对象属性与给定的值相等，则返回 true ；否则返回 false 
// 返回 boolean
log('propEq ---------------------------');
const abby = {name: 'Abby', age: 7, hair: 'blond'};
const fred = {name: 'Fred', age: 12, hair: 'brown'};
const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
const alois = {name: 'Alois', age: 15, disposition: 'surly'};
const kids = [abby, fred, rusty, alois];

const hasBlondHair = R.propEq('hair')('blond');
const hasBrownHair = R.propEq('hair')('brown');
const whohasBlondHair = R.filter(hasBlondHair)(kids);
const whohasBrownHair = R.filter(hasBrownHair)(kids);

log(whohasBlondHair); // [ { name: 'Abby', age: 7, hair: 'blond' } ]
log(whohasBrownHair); // [ { name: 'Fred', age: 12, hair: 'brown' },{ name: 'Rusty', age: 10, hair: 'brown' } ]
log(R.propEq('hair')('blond')(abby)); // true

// allPass  可以理解为all的组合
// 返回 function
log('allPass ---------------------------');
const biggerThanThree = (x) => x > 3;
const smallThanTen = (x) => x < 10;
const biggerThanThreesmallThanTen = R.allPass([biggerThanThree, smallThanTen]);
const a6 = biggerThanThreesmallThanTen(7);
const a7 = biggerThanThreesmallThanTen(11);
log(a6); // true
log(a7); // false


// always 返回一个返回恒定值的函数。注意，对于非原始值，返回的值是对原始值的引用。
log('always ---------------------------');
const t = R.always('Allen');
const a8 = t();
let a9 = 'jimmy';
const a10 = R.always(a9)();
log(a8); // allen
log(a10); // jimmy
a9 = 'tommy';
log(a9); // tommy
log(a10); // jimmy


// and 如果两个参数都是 true，则返回 true；否则返回 false。 相当于 | 运算，两边都会运算
log('and ---------------------------');
log(R.and(true, false)); // false
log(R.and(true, true)); // true
log(R.and(false, false)); // false
log(R.and(false, true)); // false
log(R.and(() => false, () => false)); // [Function] 这就是and和both的区别，both会调用两个函数。而and不会。所以，and就比较直接的两个数值的时候用
log(R.and(false, '1111111')); // false
log(R.and(true, '1111111')); // 1111111
log(R.and('222222', '1111111')); // 1111111

// both 
//该函数调用两个函数，并对两函数返回值进行与操作。若第一个函数结果为 false-y 值 (false, null, 0 等)，则返回该结果，否则返回第二个函数的结果。注意，both 为短路操作，即如果第一个函数返回 false-y 值，则不会调用第二个函数。
log('both ---------------------------');
const test1 = R.both((x) => x > 3, (x) => x < 10);
log(test1(2)); // false
log(test1(4)); // true
log(test1(11)); // false
const test2 = R.both((x) => x > 3, (x) => x + 10);
log(test2(2)); // false
log(test2(4)); // 14
log(test2(11)); // 21

// any
// 灵光一闪  any 和 all 都是对数组的每一个元素判断，all是都满足才true， any是只要任意满足就true
log('any ---------------------------');
const lessThan0 = (x) => x < 0;
log(R.any(lessThan0)([1, 2, 3, -1])); // true
log(R.any(lessThan0)([1, 2, 3, 1])); // false

// anyPass 可以看多any的组合
log('anyPass ---------------------------');
const bt10 = (x) => x > 10;
const bt20 = (x) => x > 20;
const bt10lt20 = R.anyPass([bt10, bt20]);
log(bt10lt20(23)); // true
log(bt10lt20(9)); // false

// ap 
// 基本理解了，
log('ap ----------------------');
log(R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']))//=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
log(R.ap([(x) => x -1, (x) => x * 2 ], [1,2,3])); // [0,1,2,2,4,6]

// aperture 这个感觉是纯数学方面的，一般用不到吧
log('aperture ----------------------');
log(R.aperture(2, [1,2])); // [ [1, 2] ]
log(R.aperture(2, [1,2,3, 4])); // [ [1, 2], [2,3], [3,4] ]


// append 数组后边添加元素
log('append ----------------------');
log(R.append(100)([1,2,3])); // [1,2,3,100]
log(R.append('tests', []));  //=> ['tests']

// apply 可以理解为es6的apply
log('apply ----------------------');
const a11 = [1, 2, 3, -99, 42, 6, 7];
log(R.apply(Math.max)(a11)); // 42
log(Math.max(1,2)); // 2

// applySpec
// 接受一个属性值为函数的对象，返回一个能生成相同结构对象的函数。返回的函数使用传入的参数调用对象的每个属性位对应的函数，来生成相应属性的值。
log('applySpec ----------------------');
const createMyObj = R.applySpec({
    first: (x) => x + 10,
    second: R.add,
});
// 传入的参数必须是符合所有函数的参数的，依次取
log(createMyObj(2,3));


// applyTo  接受一个值，并将一个函数作用于其上。
log('applyTo ----------------------');
const a12 = R.applyTo(42);
log(a12(R.add(1))); //=> 43

// ascend
log('ascend ----------------------');
const byAge = R.ascend(R.prop('age'));
const people = [
  { name: 'Emma', age: 70 },
  { name: 'Peter', age: 78 },
  { name: 'Mikhail', age: 62 },
];
const peopleByYoungestFirst = R.sort(byAge, people);
log(peopleByYoungestFirst);

// assoc  浅复制对象，然后设置或覆盖对象的指定属性。
log('assoc ----------------------');
const a13 = R.assoc('c', 3, {a: 1, b: 2}); 
log(a13)  // {a: 1, b: 2, c: 3}
const a14 = R.assoc('a', 4, { a: 10, b: 12});
log(a14); //  { a: 4, b: 12}

// assocPath 浅复制对象，设置或覆盖即将创建的给定路径所需的节点，并将特定值放在该路径的末端。
// 看例子吧
log('assocPath ----------------------');
log(R.assocPath(['a', 'b'], 10, { a: 1})); //  { a: { b: 10 } }
log(R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}})); //=> {a: {b: {c: 42}}}
