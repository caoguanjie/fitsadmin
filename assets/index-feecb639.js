function t(t){return!!new RegExp(/^1[3456789]\d{9}$/).test(t)}function e(t){return!!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(t)}function n(t){return!!new RegExp(/0\d{2,3}-\d{7,8}$/).test(t)}function r(t){return!!new RegExp(/^\d{3}$/).test(t)}function a(t){return!!new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*_-]).{10,20}$/).test(t)}export{n as a,e as b,r as c,a as d,t as i};