angular.module('app').factory('haEventData', function(haEvent, $q) {

    return {

        createEvent: function(newEventData) {
            var newEvent = new haEvent(newEventData);
            var dfd = $q.defer();

            newEvent.$save().then(function() {
                dfd.resolve(newEvent._id);
            }, function(response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        }

    }

});