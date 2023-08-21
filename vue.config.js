const { defineConfig } = require('@vue/cli-service')

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const CircularDependencyPlugin = require('circular-dependency-plugin')

const isLib = process.env.TYPE === 'lib'

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: !isLib
      ? [
          new MonacoWebpackPlugin({
            languages: ['javascript', 'css', 'html', 'json'],
            features: ['coreCommands', 'find'],
          }),
          new CircularDependencyPlugin({}),
        ]
      : [new CircularDependencyPlugin({})],
  },
})
