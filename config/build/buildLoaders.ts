import {ModuleOptions} from 'webpack'
import {BuildOptions} from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from 'react-refresh-typescript'
import {buildBabelLoader} from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

    const isDev = options.mode === 'development'

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            }
        },
    }

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // order is very important
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    const tsLoader = {
        // ts-loader умеет работатьс  .tsx
        // без ts - babel-loader
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    // HMR в реакте с ts
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    // только сборка без проверки
                    transpileOnly: isDev
                }
            }
        ],
        exclude: /node_modules/,
    }

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgrLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    // fill stroke как color
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    const babelLoader =  buildBabelLoader(options)

    return [
        cssLoader,
        // tsLoader,
        babelLoader,
        assetLoader,
        svgrLoader
    ]
}