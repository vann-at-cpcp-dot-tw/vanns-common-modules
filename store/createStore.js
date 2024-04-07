var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { create } from 'zustand';
var defaultStore = {
    lightbox: []
};
export var createStore = function (initStore) {
    var useStore = create(function (set, get) { return (__assign(__assign(__assign({}, defaultStore), (initStore || {})), { set: function (updateState) {
            if (updateState === void 0) { updateState = {}; }
            return set(function (state) {
                return __assign(__assign({}, state), updateState);
            });
        }, lightboxOpen: function (actionId) {
            if (!actionId) {
                return null;
            }
            return set(function (state) {
                return {
                    lightbox: __spreadArray(__spreadArray([], state.lightbox, true), [actionId], false)
                };
            });
        }, lightboxClose: function (actionId) {
            if (!actionId) {
                return set(function (state) {
                    return {
                        lightbox: []
                    };
                });
            }
            return set(function (state) {
                var _a;
                return {
                    lightbox: (_a = state.lightbox) === null || _a === void 0 ? void 0 : _a.filter(function (id) {
                        return id !== actionId;
                    })
                };
            });
        } })); });
    return {
        useStore: useStore
    };
};
