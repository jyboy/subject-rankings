import { defineConfig } from '@tarojs/cli';
import devConfig from './dev';
import prodConfig from './prod';

export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: 'subject-rankings',
    date: '2018-05-02',
    deviceRatio: {
      750: 1
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {},
    copy: {
      patterns: [
        {
          from: 'public/',
          to: 'dist/'
        }
      ],
      options: {}
    },
    framework: 'react',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false
      }
    },
    cache: {
      enable: true
    },
    h5: {
      devServer: {
        host: '127.0.0.1'
      },
      router: {
        customRoutes: {
          'pages/university/university': '/university',
          'pages/subject/subject': '/subject'
        }
      },
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[fullhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[fullhash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false,
          config: {
            namingPattern: 'module',
            generateScopedName: '[name]__[local]___[fullhash:base64:5]'
          }
        },
        pxtransform: {
          enable: true,
          config: {
            unitPrecision: 5,
            propList: ['*'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            onePxTransform: false,
            minPixelValue: 4,
            baseFontSize: 20,
            maxRootSize: 24,
            minRootSize: 20
          }
        }
      },
      esnextModules: ['taro-ui']
    },
    mini: {}
  };

  if (process.env.NODE_ENV === 'development') {
    return merge({}, baseConfig, devConfig);
  }
  return merge({}, baseConfig, prodConfig);
});
