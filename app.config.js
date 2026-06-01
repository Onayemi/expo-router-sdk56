import "dotenv/config";

export default {
  expo: {
    name: "my-app",
    slug: "my-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    ios: {
      icon: "./assets/expo.icon",
      infoPlist: {
        LSApplicationQueriesSchemes: ["whatsapp"],
      },
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      predictiveBackGestureEnabled: false,
      package: "com.remlex.myapp",
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#208AEF",
          android: {
            image: "./assets/images/splash-icon.png",
            imageWidth: 76,
          },
        },
      ],
      // NEW: Config Plugin injection to resolve package visibility queries for Android 11+
      [
        "expo-build-properties",
        {
          android: {
            manifestQueries: {
              packageNames: ["com.whatsapp"],
              intentQueries: [
                {
                  action: "android.intent.action.VIEW",
                  data: { scheme: "whatsapp" },
                },
              ],
            },
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        // projectId: process.env.EXPO_PUBLIC_PROJECT_ID || "your-fallback-id",
      },
    },
    owner: "remlex",
  },
};
