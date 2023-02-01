import 'package:flutter/material.dart';
import 'package:green_life/shared/exports.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = PageController(viewportFraction: 0.8, keepPage: true);
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.symmetric(
              horizontal: width * 0.09, vertical: height * 0.03),
          child: SingleChildScrollView(
              child: Stack(
            children: [
              Row(
                children: [
                  const Expanded(child: SizedBox()),
                  const Text('Logo'),
                  SizedBox(
                    width: width * 0.2,
                  ),
                  Container(
                      height: height * 0.029,
                      width: width * 0.2,
                      decoration: BoxDecoration(
                          color: const Color.fromARGB(204, 217, 241, 223),
                          borderRadius: BorderRadius.circular(20)),
                      child: const Center(
                        child: Text(
                          'Skip',
                          style: TextStyle(
                              color: Color.fromARGB(216, 85, 84, 84),
                              fontWeight: FontWeight.w500),
                        ),
                      ))
                ],
              ),
              Padding(
                padding: EdgeInsets.only(top: height * 0.1),
                child: Column(
                  children: [
                    Container(
                      height: height * 0.3,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(36),
                        color: Colors.grey,
                      ),
                    ),
                    SizedBox(
                      height: height * 0.017,
                    ),
                    const Center(
                      child: Text(
                        'Fast Online Process',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontWeight: FontWeight.w700,
                            fontSize: 32,
                            color: Color.fromARGB(221, 81, 81, 81)),
                      ),
                    ),
                    SizedBox(
                      height: height * 0.01,
                    ),
                    Padding(
                      padding:  EdgeInsets.symmetric(horizontal: width*0.59),
                      child: const Text(
                        'Our App allows fast, secure online loan applications',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontWeight: FontWeight.w400,
                            fontSize: 14,
                            color: Colors.black),
                      ),
                    ),
                    SizedBox(
                      height: height * 0.05,
                    ),
                    SmoothPageIndicator(
                        controller: controller,
                        count: 4,
                        axisDirection: Axis.horizontal,
                        effect:  SlideEffect(
                            spacing: 8.0,
                            dotWidth: width*0.03,
                            dotHeight: width*0.03,
                            paintStyle: PaintingStyle.stroke,
                            strokeWidth: 1.5,
                            dotColor: Colors.grey,
                            activeDotColor: const Color.fromARGB(209, 52, 168, 83))),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsets.only(
                  top: height * 0.6,
                ),
                child: Column(
                  children: [
                    Container(
                      height: height * 0.07,
                      width: width,
                      decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(20),
                          color: const Color.fromARGB(207, 52, 168, 83)),
                      child: const Center(
                        child: Text(
                          'Get started',
                          style: TextStyle(
                              fontWeight: FontWeight.w700,
                              fontSize: 24,
                              color: Colors.white),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: height * 0.02,
                    ),
                    const Text.rich(
                      TextSpan(children: <TextSpan>[
                        TextSpan(
                          text: "Don't have an account? ",
                          style: TextStyle(
                              fontWeight: FontWeight.w400,
                              fontSize: 16,
                              color: Colors.black),
                        ),
                        TextSpan(
                          text: "Sign up",
                          style: TextStyle(
                              fontWeight: FontWeight.w400,
                              fontSize: 16,
                              color: Colors.green),
                        )
                      ]),
                    ),
                  ],
                ),
              ),
            ],
          )),
        ),
      ),
    );
  }
}
