angular.module('userCtrl', ['userService'])

  .controller('userController', function(User) {

    var vm = this;

    // set a processing variable to show loading things
    vm.processing = true;

    // grab all the users at page load
    User.all()
      .success(function(data) {

        // when all the users come back, remove the processing variable
        vm.processing = false;

        // bind the users that come back to vm.users
        vm.users = data;
      });

    // function to delete a user
    vm.deleteUser = function(id) {
      vm.processing = true;

      User.delete(id)
        .success(function(data) {

          // get all users to update the table
          // you can also set up your api 
          // to return the list of users with the delete call
          User.all()
            .success(function(data) {
              vm.processing = false;
              vm.users = data;
            });

        });
    };

  })
  .controller('userCreateConroller', function(User) {
    var vm = this;

    // var to show / hide elements of the view
    // used to differentiate between elements in the view
    vm.type = 'create';

    vm.saveUser = function() {
      vm.processing = true;

      vm.message = '';

      User.create(vm.userData)
        .success(function (data) {
          vm.processing = false;

          // clear the  form
          vm.userData = {};
          vm.message = data.message;
        });
    };
  })
  .controller('userEditController', function($routeParams, User) {
    var vm = this;

    vm.type = 'edit';

    // Get  the user data for the user we want to edit
    User.get($routeParams.user_id)
      .success(function(data) {
        vm.userData = data;
        console.log(vm.userData);
      });

    vm.saveUser = function() {
      vm.processing = true;
      vm.message = '';

      User.update($routeParams.user_id, vm.userData)
        .success(function(data) {
          vm.processing = false;

          // now clear the form
          vm.userData = {};

          vm.message = data.message;
        });
    };
  });









