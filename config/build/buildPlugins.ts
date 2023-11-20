import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, {Configuration, DefinePlugin} from "webpack";
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins({paths, mode, analyzer, platform}: BuildOptions): Configuration['plugins'] {

    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            // template: path.resolve(__dirname, 'public', 'index.html'),
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico')
        }),
        new DefinePlugin({
            __PLATFORM: JSON.stringify(platform),
            __ENV_MODE: JSON.stringify(mode)
        }),
    ]

    if(isDev) {
        // отображает процесс сборки(медленный)
        plugins.push(new webpack.ProgressPlugin())
        // выносит проверку типов в отдельный процесс
        plugins.push(new ForkTsCheckerWebpackPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    if(isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))
        plugins.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(paths.public, 'locales'), to:  path.resolve(paths.output, 'locales')},
            ],
        }),)
    }

    if(analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}