const path = require("path");
const webpack = require("webpack");
//TODO: Fix this.
const hljsLanguages = [
  "actionscript",
  "apache",
  "autohotkey",
  "bash",
  "basic",
  "cs",
  "cpp",
  "css",
  "delphi",
  "diff",
  "dockerfile",
  "go",
  "gradle",
  "xml",
  "http",
  "ini",
  "json",
  "java",
  "javascript",
  "kotlin",
  "lua",
  "makefile",
  "markdown",
  "nginx",
  "objectivec",
  "php",
  "perl",
  "python",
  "ruby",
  "rust",
  "sql",
  "swift",
  "brainfuck",
  "coffeescript"
];

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.join(path.resolve(__dirname, "public"), "js")
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'}
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${hljsLanguages.join("|")})$`)
    )
  ],
  mode: "none"
};
