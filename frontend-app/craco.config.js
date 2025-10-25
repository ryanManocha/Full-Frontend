module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Completely disable source maps
      webpackConfig.devtool = false;
      
      // Remove all source map loader rules completely
      webpackConfig.module.rules = webpackConfig.module.rules.filter(rule => {
        // Remove any rule that contains source-map-loader
        if (rule.use && Array.isArray(rule.use)) {
          rule.use = rule.use.filter(use => 
            !(use.loader && use.loader.includes('source-map-loader'))
          );
          // If no loaders left, remove the rule
          if (rule.use.length === 0) {
            return false;
          }
        }
        return true;
      });

      // Also disable source map generation in plugins
      if (webpackConfig.plugins) {
        webpackConfig.plugins = webpackConfig.plugins.filter(plugin => {
          return !(plugin.constructor.name && plugin.constructor.name.includes('SourceMap'));
        });
      }
      
      return webpackConfig;
    },
  },
};
