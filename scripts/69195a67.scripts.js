"use strict";angular.module("sniperAceApp",["ngCookies","ngResource","ngSanitize","ngRoute","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/calculator.html",controller:"CalculatorCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("sniperAceApp").controller("CalculatorCtrl",["$scope","$http","$sce","$modal",function(a,b,c,d){var e=this;b.get("data/rangeTables.json").then(function(b){a.weapons=b.data,a.activeWeapon=a.weapons[0]}),a.usingRangefinder=!0,a.usingKestrel=!0,a.range=null,a.elevShooter=null,a.elevTarget=null,a.windStr=null,a.elevationMoa=0,a.windMoa=0,this.easyWindDirs=[{text:"&rarr;",dir:90},{text:"&larr;",dir:270}],this.activeWindDir=this.easyWindDirs[0],a.activeWindDirText=c.trustAsHtml(this.activeWindDir.text),this.openModal=function(){a.modalInstance=d.open({templateUrl:"views/modal.html",scope:a})},this.getRange=function(a,b,c,d){var e;if(a===!0)e=b;else{var f=b,g=Math.max(c,d)-Math.min(c,d);e=Math.sqrt(Math.pow(f,2)+Math.pow(g,2))}return e},this.getRangeTableMatches=function(a,b){var c,d;if(100>=b)c=a.rangeTable[0],d=a.rangeTable[0];else for(var e=0;e<a.rangeTable.length;e++){var f=a.rangeTable[e];if(b===f.range){c=f,d=f;break}if(b-f.range>0&&b-f.range<100){c=f,e<a.rangeTable.length-1&&(d=a.rangeTable[e+1]);break}}return{bestRangeTableMatch:c,nextRangeTableMatch:d}},this.calculateElevationMoa=function(a,b,c){var d=c.elevation-b.elevation,e=(a-b.range)/100;return b.elevation+d*e},this.calculateWindMoa=function(a,b,c,d,e){var f=c.wind-b.wind,g=(a-b.range)/100,h=b.wind+f*g,i=h/4*d;return 90===e.dir&&(i=-1*i),i},a.calculateMoa=function(){var b=e.getRange(a.usingRangefinder,a.range,a.elevShooter,a.elevTarget),c=e.getRangeTableMatches(a.activeWeapon,b);if(c.bestRangeTableMatch&&c.nextRangeTableMatch)a.elevationMoa=e.calculateElevationMoa(b,c.bestRangeTableMatch,c.nextRangeTableMatch),a.windMoa=e.calculateWindMoa(b,c.bestRangeTableMatch,c.nextRangeTableMatch,a.windStr,e.activeWindDir),e.openModal();else{var d=a.activeWeapon.rangeTable[a.activeWeapon.rangeTable.length-1];alert("Out of range.\nRange shouldn't be bigger than: "+d.range)}},a.nextWindDir=function(){var b=e.easyWindDirs.indexOf(e.activeWindDir);e.activeWindDir=b===e.easyWindDirs.length-1?e.easyWindDirs[0]:e.easyWindDirs[b+1],a.activeWindDirText=c.trustAsHtml(e.activeWindDir.text)},a.cancelModal=function(){a.modalInstance.dismiss("cancel")}}]),angular.module("sniperAceApp").controller("HeaderCtrl",["$scope","$location",function(a,b){a.isActive=function(a){return a===b.path()}}]);