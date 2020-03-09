---
title:  "ES6构造函数"
date:   "2019-07-18"
categories: javascript ES6
keywords: "这个是篇关键字"
---

今天看代码的时候发现一个es6的写法，顿时一脸懵逼，特意网上查了一下，在此做个记录。

在JavaScript中，平时我们生成实例对象的传统方法是通过构造函数。就像下面个例子：

``` javascript
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.toString = function () {
        console.log(`我叫${this.name}，今年${this.age}岁`);
    };

    var caiHai = new Person("蔡海",18);
    caiHai.toString();
```
在这个例子中，我定义了一个叫Person的构造函数，然后在他的原型上定义一个toString方法（对于这个不太理解的可以去百度javascript的原型），最后生成了一个叫做caiHai的实例对象并执行toString方法。然而在es6中，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类，于是，上面的代码就可以换成下面这种，也就是我今天看见这种：

``` javascript
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        toString() {
            console.log(`我叫${this.name}，今年${this.age}岁`);
        }
    }

    var caiHai = new Person("蔡海",18);
    caiHai.toString();
```

在这段代码中，定义了一个“类”，里面的constructor就是构造方法，而toString也同样是定义在它的原型上的，只是写法不一样而已。
需要注意的是，类里面的构造函数必须是constructor，不能用其他的，也就是说一个类必须有constructor方法，但是不写也是可以的，因为JavaScript引擎会自动为它添加一个空的constructor方法.

``` javascript
    class Person {
    }

    // 等同于
    class Person {
        constructor() {}
    }
```

### 总结
本人前端菜鸡一枚，写这些东西除了装p以外，主要还是为了做个笔记深入理解，后期可能在这个boke上添加一个评论功能，但是有写的不对的地方欢迎大家指正。
