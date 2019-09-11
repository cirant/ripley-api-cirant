"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = void 0;

var _redis = _interopRequireDefault(require("redis"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var axios = require('axios');

_dotenv["default"].config();

var client = _redis["default"].createClient(process.env.REDIS_SERVER, {
  password: process.env.REDIS_PASSWORD
}); //creates a new client 


client.on('connect', function () {
  console.log('redis connected');
});

var Service =
/*#__PURE__*/
function () {
  function Service() {
    _classCallCheck(this, Service);

    this.riplayUrl = process.env.RIPLEY_API_URL || 'http://localhost:3000';
  }

  _createClass(Service, [{
    key: "simulateError",
    value: function simulateError() {
      return Number((Math.random() * 100).toFixed(0)) <= 15;
    }
  }, {
    key: "getproductDetails",
    value: function getproductDetails(sku) {
      var _this = this;

      if (this.simulateError()) {
        this.handlerError(sku, 'fail getting product by sku');
        return this.getproductDetails(sku);
      } else {
        return new Promise(function (resolve, reject) {
          client.exists(sku,
          /*#__PURE__*/
          function () {
            var _ref = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee(err, exist) {
              var _ref2, data;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!(exist === 1)) {
                        _context.next = 4;
                        break;
                      }

                      client.get(sku, function (e, el) {
                        return resolve(JSON.parse(el));
                      });
                      _context.next = 11;
                      break;

                    case 4:
                      _context.next = 6;
                      return axios.get("".concat(_this.riplayUrl, "/products/").concat(sku));

                    case 6:
                      _ref2 = _context.sent;
                      data = _ref2.data;
                      client.set(sku, JSON.stringify(data));
                      client.expire(sku, 120);
                      return _context.abrupt("return", resolve(data));

                    case 11:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());
        });
      }
    }
  }, {
    key: "handlerError",
    value: function handlerError(sku, message) {
      var date = new Date();
      var name = "error:product:".concat(sku, " ").concat(message, " on ").concat(date);
      client.rpush(['errors', name], _redis["default"].print);
    }
  }]);

  return Service;
}();

exports.Service = Service;