import React, { Component } from 'react';
import { render } from 'react-dom';
import * as r from 'ramda';
import moment from 'moment';
import App from "./App.jsx";
import { BrowserRouter } from 'react-router-dom'

import '../sass/main.scss';

let csrftoken = csrfToken();

function csrfToken() {
  return (function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = jQuery.trim(cookies[i]);
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  })('csrftoken');
}

function csrfSafeMethod(method) {
  return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

$.ajaxSetup({
  beforeSend: function(xhr, settings) {
    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
      xhr.setRequestHeader("X-CSRFToken", csrftoken);
    }
  }
});

render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById("app")
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./static/js/service_worker.js')
    .then(function() { console.log('Service Worker Registered'); });
}
