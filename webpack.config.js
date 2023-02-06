const path = require('path')
const prod = false
module.exports = {
  mode: prod ? 'production' : 'development',
  output: {
    path: path.resolve('wwwroot'),
    publicPath: '',
  },
  module: {
    rules: [
      {
				test: /\.svelte$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
					}
				}
			},
			{
				// required to prevent errors from Svelte on Webpack 5+
				test: /node_modules\/svelte\/.*\.mjs$/,
				resolve: {
					fullySpecified: false
				}
			}
    ]
  },
  resolve: {
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['browser', 'module', 'main'],
    // modules: [path.resolve('.')],
    symlinks: false, // https://webpack.js.org/guides/build-performance/#resolving
    fallback: {
      // cypress preprocessor requires 'path', so we need to tell webpack how to polyfill it
      // seems to work without installing path-browserify, so just doing `false` here.
      // Tests seem super slow to start, like it's building the whole fricken project or something. But seems to speed up after running a few
      path: false, // require.resolve('path-browserify')
    },
  },
  
}