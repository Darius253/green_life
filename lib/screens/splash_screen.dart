import 'dart:async';
import 'package:flutter/cupertino.dart';
import '../shared/exports.dart';

class Splash extends StatefulWidget {
  const Splash({super.key});

  @override
  SplashScreenState createState() => SplashScreenState();
}

class SplashScreenState extends State<Splash> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 5),
        () => Get.off(() => const OnboardingScreen()));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
          gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
            Color.fromARGB(218, 0, 127, 95),
            Color.fromARGB(209, 84, 165, 49)
          ])),
      child: Center(
        child: Image.asset('assets/images/logo.png'),
      ),
    );
  }
}
