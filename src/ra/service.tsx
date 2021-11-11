import { fetchUtils } from "react-admin";
import simpleRestProvider from "ra-strapi-rest";
export const APIU = "https://sourcya-connect.herokuapp.com";
// const APIU = "http://127.0.0.1:1337"

export const Cookies = {
  getCookie: (name: any) => {
    const v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return v ? v[2] : null;
  },

  setCookie: (name: any, value: any, days: any) => {
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
  },

  deleteCookie: (name: any) => {
    Cookies.setCookie(name, "", -1);
  },
};

const httpClient = (url: any, options: any) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = Cookies.getCookie("token");
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};
export const authProvider = {
  login: (f: any) => {
    const identifier = f.username; // strapi expects 'identifier' and not 'username'
    const password = f.password;
    const request = new Request(APIU + "/auth/local", {
      method: "POST",
      body: JSON.stringify({ identifier, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        Cookies.setCookie("token", response.jwt, 1);
        Cookies.setCookie("role", response.user.role.name, 1);
      });
  },

  logout: () => {
    Cookies.deleteCookie("token");
    Cookies.deleteCookie("role");
    return Promise.resolve();
  },

  checkAuth: () => {
    return Cookies.getCookie("token") ? Promise.resolve() : Promise.reject();
  },

  checkError: (status: any) => {
    if (status === 401 || status === 403) {
      Cookies.deleteCookie("token");
      Cookies.deleteCookie("role");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: () => {
    const role = Cookies.getCookie("role");
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export const dataProvider = simpleRestProvider(APIU, httpClient);
