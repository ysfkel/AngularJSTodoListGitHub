var TodoApp = angular.module('TodoApp', ['ngResource', 'ngRoute'])
.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: ListController
        , templateUrl: '../templates/list.html'
    })
        .when('/new', {
            controller: newController
           , templateUrl: '../templates/details.html'
        })
    .when('/edit/:id', {
        controller: editController
           , templateUrl: '../templates/details.html'
    })
    .otherwise({ redirectTo: '/' });
})


TodoApp.factory('todo', function ($resource) {
    return $resource('/api/apitodo/:id', { id: '@id' }, { update: { method: 'PUT' } });
})

var ListController = function ($scope, $location, todo) {
    //  $scope.todoes = todo.query();


    $scope.search = function () {
        todo.query({
            q: $scope.query
            , sort: $scope.sort_order
           , desc: $scope.is_desc
           , offset: $scope.offset
           , limit: $scope.limit
        },
        function (data) {
            $scope.more_data_to_pull = data.length === 20;
            $scope.todoes = $scope.todoes.concat(data);

        });
    }

    $scope.sort = function (col) {

        //if sort order is same , change sort directin
        if ($scope.sort_order === col) {
            $scope.is_desc = !$scope.is_desc;
        }
        else {
            $scope.sort_order = col;
            $scope.is_desc = false;
        }
        $scope.reset();
    }

    $scope.show_more = function () {
        $scope.offset += $scope.limit;
        $scope.search();
    }

    $scope.has_more = function () {
        return $scope.more_data_to_pull;
    }

    $scope.reset = function () {
        //  debugger;
        $scope.limit = 20;
        $scope.offset = 0;
        $scope.more_data_to_pull = true;
        $scope.todoes = [];
        $scope.search();
    }

    $scope.remove = function () {
        var id = this.todo.Id;
        todo.delete({ id: id }, function () {
            $('#todo_' + id).fadeOut('slow');
        });
    }


    $scope.sort_order = 'Priority';
    $scope.is_desc = false;


    $scope.reset();
}

var newController = function ($scope, $location, todo) {
    $scope.action = 'Add';
    $scope.save = function () {

     
        console.log($scope.item);
        todo.save($scope.item, function () {
            $location.path('/');
        });
    }
}

var editController=function($scope,$location,$routeParams,todo )
{
    $scope.action = 'Update';
    var id = $routeParams.id;
    $scope.item = todo.get({ id: id });

    $scope.save=function()
    {
        todo.update({ id: id }, $scope.item, function () {
            $location.path("/");
        });
    }
  
}