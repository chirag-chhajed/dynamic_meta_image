module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /canvas/,
        use: "null-loader",
      });
    }

    return config;
  },
  env: {
    // Workaround for https://github.com/Automattic/node-canvas/issues/1238
    // You can remove this after the issue is fixed.
    LD_PRELOAD: "/usr/lib/x86_64-linux-gnu/libfontconfig.so.1",
  },
};
