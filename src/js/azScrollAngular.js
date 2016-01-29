/*!
 * angular.azScroll
 * Copyright (c) 2016 Azat Khalilov  zminexx@gmail.com
 * License: MIT
 * @projectDescription Lightweight, cross-browser infinite scroll (angular version)
 * @author Azat Khalilov
 * @version 1.0.0
 */
(function($){

    var module=angular.module('az.scroll',[]);
        module.directive('azScroll', azScroll);

    azScroll.$inject=['$parse','$document'];

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this,
                args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function azScroll($parse,$document){
        function link($scope, element, attrs){

            var self=this;
            var defaults={
                distanceBottom: 1,
                distanceTop: 1,
                debounce: 250,
                direction:'bottom'
            };

            var optionsAttr=[
                {option:'direction',attr:'azScrollDirection'},
                {option:'container',attr:'azScrollContainer'},
                {option:'distanceTop',attr:'azScrollDistanceTop'},
                {option:'distanceBottom',attr:'azScrollDistanceBottom'},
                {option:'debounce',attr:'azScrollDebounce'}

            ];

            var api={
                lastPosTop:-1
            };

            var options=angular.extend({},defaults);


            function isDisable(){
                return api.disabled
            }

            function disable(){
                api.disabled=true;
            }

            function enable(){
                api.disabled=false;
            }

            function checkBottom(){
                var curHeight=api.element.scrollHeight -api.element.scrollTop-options.distanceBottom;

                if (api.hasOwnProperty('lastPosBottom')&&api.lastPosBottom<api.element.clientHeight&&curHeight<api.element.clientHeight){
                    api.lastPosBottom=curHeight;
                    return false;
                }
                api.lastPosBottom=curHeight;
                return curHeight <= api.element.clientHeight;
            }
            function checkTop(){
                var curHeight=api.element.scrollTop - options.distanceTop;
                if (api.lastPosTop<0&&curHeight<0){
                    api.lastPosTop=curHeight;
                    return false;
                }
                api.lastPosTop=curHeight;
                return curHeight <= 0;
            }

            function scrollEvent(){
                if (isDisable()) {
                    return;
                }
                switch (options.direction) {
                    case 'topbottom':
                        if (checkBottom()) {
                            api.bottomDebounce();
                        }
                        if (checkTop()) {
                            api.topDebounce();

                        }

                        break;
                    case 'top':
                        if (checkTop()) {
                            api.topDebounce();
                        }
                        break;
                    default:
                        if (checkBottom()) {
                            api.bottomDebounce();
                        }
                }
            }


            function optionsFromAttribute(){
                function getValueAttr(nameOptions,nameAttr){
                    options[nameOptions]=attrs.hasOwnProperty(nameAttr)&&attrs[nameAttr]||options[nameOptions];
                }
                optionsAttr.forEach(function(item){
                    getValueAttr(item.option,item.attr)
                });
            }

            function destroy(){
                if (api.$element){
                    api.$element.unbind('scroll');
                }
            }

            $scope.$watch(attrs.azScrollDisable,function(newValue,oldValue){
                if (newValue===oldValue) return;
                newValue?disable():enable();
            });


            $scope.$watch(attrs.azScroll, function (newValue, oldValue) {
                    destroy();
                    if (!newValue){
                        return;
                    }
                    if (angular.isFunction(newValue)){
                        api.event=newValue;
                        api.isFunction=true;
                        optionsFromAttribute();
                    }else if (typeof newValue =='object') {
                        api.isFunction=false;
                        angular.extend(options,newValue);
                        api.event=options.callback
                    }
                    else{
                        destroy();
                        return;
                    }

                    api.$element=options.container?angular.element(document.querySelector(options.container)):element;
                    api.element=api.$element[0];

                    api.bottomDebounce=debounce(function(){
                        api.event('bottom')
                    },options.debounce);

                    api.topDebounce=debounce(function(){
                        api.event('top')
                    },options.debounce);


                    api.$element.on('scroll',scrollEvent);


                }
                , true);





            $scope.$on('$destroy',function(){
                destroy();
            })



        }
        return {
            restrict: 'A',
            link: link
        };
    }
})(jQuery);
