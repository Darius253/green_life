import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get_navigation/src/root/get_cupertino_app.dart';
import 'package:green_life/screens/splash_screen.dart';
import 'package:green_life/shared/exports.dart';

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    SystemChrome.setPreferredOrientations(
        [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);

    return const GetCupertinoApp(
      title: 'AwStore',
      debugShowCheckedModeBanner: false,
      localizationsDelegates: <LocalizationsDelegate>[
        DefaultMaterialLocalizations.delegate,
        DefaultWidgetsLocalizations.delegate,
      ],
      home: Splash(),
    );
  }
}
