### Lightweight, cross-browser infinite scroll. This is angular version. jQuery version you can view [this](https://github.com/AzatKhalilov/azScroll)

#Get Started
**1.** Get azScrollAngular in one of the following ways:

+ or clone this repository
+ or [download by link](https://github.com/AzatKhalilov/azScrollAngular/blob/master/src/js/azScrollAngular.js)
+ or via [Bower](http://bower.io/) by running: bower install azScrollAngular

**2.** Include azScrollAngular.js in your index.html

**3.** Add 'az.scroll' module in your main module's list of dependencies

**4.** You can use the directive one way

`<element-scrolling az-scroll="callback"></element-scrolling>`

`<element-scrolling az-scroll="settings object"></element-scrolling>`

or

`<any-element az-scroll="callback" az-scroll-container="css selector element's scrolling"></any-element>`

`<any-element az-scroll="settings object"></any-element>`


If you used "callback" you can use next attributes:


+ **az-scroll-container**="css selector" - used if directive is assigned not on element scroll.
+ **az-scroll-direction**="top|bottom|topbottom" - the boundary which must be checked
+ **az-scroll-distance-top**="integer value" - offset from top border
+ **az-scroll-distance-bottom**="integer value" - offset from bottom border
+ **az-scroll-debounce**="timeout value in millisecound" - timeout value  after run callback

If you used "settings object" you can use next properties of object:
+ **direction**
+ **container**
+ **distanceTop**
+ **distanceBottom**
+ **debounce**

The values of this property are the same as for callback 


#License
azScrollAngular is licensed under the MIT license. See the LICENSE file for more details.
