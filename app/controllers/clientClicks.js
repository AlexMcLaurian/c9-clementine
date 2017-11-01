'use strict';

function twitterLogin(){
    window.location.href = '/request-token';
}

function twitterToken(){
    window.location.href='/access-token' + window.location.search;
}

(function () {

})();