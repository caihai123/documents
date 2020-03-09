---
title:  "详细记录js的原型链"
date:   "2019-07-23"
categories: javascript
keywords: "这个是篇关键字"
---
今天来讲一下js的原型，加深下理解，如有不对的地方还望指正（如果现在已经有评论功能的话）

## 什么是原型 
>原型就是function对象上的一个属性，原型也是一个对象。

现在我们来写一个例子：

``` js
    function Person(name){
        this.name = name;
    }

    console.log(Person.prototype);
```
在上面的代码中，我定义一个构造函数Person，函数也是一种对象，并且它有个叫prototype的属性，我直接将这个属性打印出来，发现它也是一个对象，而这个对象就是我们今天的主角，原型。具体原型什么样的，我截了张图：![Image text](/static/img/prototype01.png)图中你看到的这个对象就是Person的原型；而它的里面发现有两个属性：constructor和__proto__；我们都不用将constructor打印出来，直接就能看出它就是我们的构造函数Person，然后我们就可以得出今天的一个结论：在构造函数的原型上，有个叫constructor的属性，而这个属性就是我们的构造函数本身。然后我们来看一下这个__proto__属性，在这之前我们接着上面的代码继续写，先实例出一个Person的对象p1，然后将它打印出来：

``` js
    var p1 = new  Person("蔡海");
    console.log(p1);
```
接着将这个对象展开，我们发现里面也有个__proto__属性，如图：
我们继续打印出这个属性，如图：然后就会发现这也是一个对象，并且和我们之前打印的Person.prototype完全一样，这样就很清晰了，原型说白了就只是一个属性，我们可以直接通过prototype去找到并修改它，然后我们还可以通过该函数实例出来的对象的__proto__属性找到它，但是不建议在这修改它。
## 原型的作用
>充当了构造函数实例对象的公共祖先，通过该构造函数产生的对象，可以继承该原型的属性和方法,如下示例：

``` js
    function Person1(sex){
        this.lastName = "蔡";
        this.site = "贵阳";
        this.speak = function(){
            console.log("我喜欢钢铁侠！")
        }
        this.sex = sex;
    }
    
    function Person2(sex,name){
        this.lastName = "蔡";
        this.site = "贵阳";
        this.speak = function(){
            console.log("我喜欢钢铁侠！")
        }
        this.sex = sex;
        this.name = name;
    }
```
在上面有两个构造函数分别是Person1和Person2，但是他们有一些公有的属性和方法，现在我们就可以通过原型将这些公有属性和方法提取出来，如下面的代码；
``` js
    var obj = {
        lastName:"蔡",
        site:"贵阳",
        speak:function(){
            console.log("我喜欢钢铁侠！")
        }
    }
    function Person1(sex){
        this.sex = sex;
    }
    
    function Person2(sex,name){
        this.sex = sex;
        this.name = name;
    }

    Person1.prototype = obj;
    Person2.prototype = obj;

    var p1 = new Person1("男");
    var p2 = new Person2("女","小花");

    console.log(p1.lastName);//蔡
    console.log(p2.lastName);//蔡
```

## 原型链

在最上面我们打印Person.prototype的时候就发小它里面也有个__proto__属性，而这个属性就是这个原型对象的原型，也就是说在原型的上面还有原型，他们通过__proto__属性连接，组成一个链式的结构，这就是原型链。实际上对象不仅是继承它原型上的属性和方法，而是继承整个原型链上的属性和方法，当他在自己身上找不到某个属性的时候，就会沿着原型链从下往上找，直到原型链的终点Object.prototype,就如我们的toString方法就是继承的Object.prototype上的。绝大多数对象都会继承自Object.prototype，为什么不是所有，在下面的Object.create。

``` js
    function Grand(){

    }
    Grand.prototype.lastName = "cai";
    var grand = new Grand();
    
    function Fanther(){
        this.name = "hai";
    }
    Fanther.prototype = grand;
    var fanther = new Fanther();

    function Son(){
        this.name = "小花";
    }
    Son.prototype = fanther;
    var son = new Son();

    console.log(son.lastName);//"cai"
    console.log(son.name);//"小花"
    console.log(son.toString);//function toString(){}
```
## Object.create
>Object.create(proto, [propertiesObject]);

这就很明显了，Object.create是一个方法，使用该方法可以创建出一个新对象，它可接收两个参数：proto是一个对象且必填，它指定了新对象的原型；第二个参数：可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称；上面这句话完全是复制的，我也不太懂，有时间研究下，今天主要讲的第一个参数：
    
```  js
    var proto = {}
    var obj1 = Object.create(proto)
    
    obj.__proto__ === proto;//true

    var obj2 = Object.create(null)
    obj2.__proto__;//undefined
```
从上面的可以看出来，在使用Object.create创建对象的时候，可以为其指定一个原型对象，当指定的对象为null的时候，就可以创建出一个没有原型的对象，这就是为什么不是所有对象都会继承Object.prototype的原因。

## 总结

1. 定义：原型是function对象上的一个属性，它定义了构造函数实例对象的公共祖先。通过该构造函数产生的对象，可以继承该原型的属性和方法。原型也是一个对象。
2. 利用原型的特点和概念，可以提取公共属性。
3. 构造函数可通过prototype属性查看并修改原型，对象可通过__proto__查看原型但是不建议修改。
4. 可以通过构造函数的原型上的constructor属性找到构造函数自身，如Object.prototype上的constructor属性就是Object构造函数自身。
5. Object.create方法可创建出一个没有原型的对象，绝大多数对象都会继承Object.prototype。
