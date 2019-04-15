module.exports = {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    ["@babel/plugin-transform-regenerator", {
      "asyncGenerators": true,
      "generators": true,
      "async": true
    }],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    '@babel/plugin-syntax-dynamic-import'
  ]
}