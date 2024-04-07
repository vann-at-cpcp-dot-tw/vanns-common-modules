"use strict";
/** @type {import('next').NextConfig} */
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
var path = require('path');
var webpack = require('webpack');
var nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    reactStrictMode: true,
    swcMinify: true,
    env: {},
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'example.ddev.site',
                // port: '',
                // pathname: '',
            },
        ],
        // domains: ['example.ddev.site']
    },
    webpack: function (config, _a) {
        var dev = _a.dev, isServer = _a.isServer;
        config.module.rules.push({
            test: /\.(graphql|gql)/,
            exclude: /node_modules/,
            loader: "graphql-tag/loader"
        });
        config.plugins.push(new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            React: 'react',
        }));
        if (!isServer) {
            // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = __assign(__assign({}, config.resolve.fallback), { fs: false });
        }
        return config;
    },
    trailingSlash: false, // for exportPathMap
};
module.exports = nextConfig;
