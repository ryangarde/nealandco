import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

export default ({ $config, redirect }) => {
  // axios.defaults.baseURL = $config.baseUrl;
  axios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${window.$nuxt.$cookies.get('token')}`;
      config.baseURL = $config.baseUrl;
      return config;
    },
    error => {
      console.log(error);
      if (error.response?.status == 401) {
        redirect('/admin/login');
      }
      return Promise.reject(error);
    }
  );
};

Vue.use(VueAxios, axios);
