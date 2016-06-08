var app = angular.module('indexApp',[]);

app.controller('menuController', function($scope,$element,$http) {
    $scope.btnName="新增用户";
    $scope.el=$element;
    $scope.redirectFrame=function(){
        var framesrc=this.el.attr("m-link");
        $("#myframe").attr("src",framesrc);
        $(".nav li").attr("class",'');
        this.el.attr("class",'active');
    }
})