const R = require('ramda');
const log = console.log;

// call 提取第一个参数作为函数，其余参数作为刚提取的函数的参数，调用该函数并将结果返回。
// 没太懂，许阿宝 v 不要学


// chain
// 若第二个参数存在 chain 方法，则调用其自身的 chain方法。该参数需符合 FantasyLand Chain 规范。[https://github.com/fantasyland/fantasy-land#chain]
// 如果第二个参数是函数，chain(f, g)(x) 等价于 f(g(x), x)。
// chian的第二参数是list或者map
const test = n => n + 2;
log(R.chain(test, [1,2,3])); // [3, 4, 5]
log(R.chain(R.append, R.head)([3,4,5]));


// clamp
// 将数字限制在指定的范围内。
log(R.clamp(1, 20, 6)); // 6
log(R.clamp(1, 20, 23)); // 20
log(R.clamp(1, 20, -1)); // 1

// clone 深拷贝
// 理解下若自身存在 clone 方法，则调用自身的 clone 方法。
const a = {
    name: 'aName',
    gender: 'aGender',
    sendFun() {
        log('this is a sendFfun');
    },
};
const b = R.clone(a);
log(b);

// comparator 生成一杯比较函数
const byHeight = R.comparator((a, b) => a.height > b.height);
const montains = [{
    name: 'ZhuMuLangMa',
    height: 8848,
    type: 'km',
}, {
    name: 'ZhuMuLangMa2',
    height: 8878,
    type: 'km',
}, {
    name: 'ZhuMuLangMa3',
    height: 178,
    type: 'km',
}, {
    name: 'ZhuMuLangMa4',
    height: 17822,
    type: 'km',
}];

const montainsSortByHeight = R.sort(byHeight, montains);
log(montainsSortByHeight);

// complement
// 对函数的返回值取反。接受一个函数 f，返回一个新函数 g：在输入参数相同的情况下，若 f 返回 'true-y' ，则 g 返回 false-y ，反之亦然。
const isNotNil = R.complement(R.isNil);
log(R.isNil(null)); // true
log(isNotNil(null)); // false
log(R.isNil(1)); // false
log(isNotNil(1)); // true


// compose 这是一个主要的函数
// 从右往左执行函数组合 （右侧函数的输出作为左侧函数的输入）。最右侧函数可以是任意元函数（参数个数不限），其余函数必须是一元函数。
// compose返回一个function
// 注意：compose 输出的函数不会自动进行柯里化。

const classIntro = (first, second) => `hello guys, let's welcome our new classmates, ${first} and ${second}`;

const printIntro =  R.compose(log, R.toUpper, classIntro);
printIntro('lancer', 'allen');