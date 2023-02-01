import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:green_life/screens/sign_in/sign_in.dart';
import 'package:green_life/shared/exports.dart';
import 'package:green_life/widgets/onboarding_widget.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  int currentIndex = 0;
  final controller = CarouselController();
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    List<Widget> pages = [
      onboardingPages(width, height, 'Fast Online Process',
          'Our App allows fast, secure online loan applications.', 'image'),
      onboardingPages(
          width,
          height,
          'Fair Charges',
          'Our interest rate is lower, with no hidden charges and processing fees.',
          'image'),
      onboardingPages(
          width,
          height,
          'Instant Deposit',
          'Immediate deposit into your account after you can confirm the loan.',
          'image'),
      onboardingPages(width, height, 'Flexible Payment',
          'Flexible repayments for your convenience.', 'image'),
    ];

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
                padding: EdgeInsets.only(
                  top: height * 0.1,
                ),
                child: Column(
                  children: [
                    CarouselSlider(
                        items: pages,
                        carouselController: controller,
                        options: CarouselOptions(
                          height: height * 0.45,
                          aspectRatio: 16 / 9,
                          viewportFraction: 1,
                          initialPage: 0,
                          enableInfiniteScroll: true,
                          reverse: false,
                          autoPlay: true,
                          autoPlayInterval: const Duration(seconds: 3),
                          autoPlayAnimationDuration: const Duration(seconds: 1),
                          autoPlayCurve: Curves.fastOutSlowIn,
                          enlargeCenterPage: true,
                          enlargeFactor: 0.3,
                          onPageChanged: (index, reason) {
                            setState(() {
                              currentIndex = index;
                            });
                          },
                          scrollDirection: Axis.horizontal,
                        )),
                    SizedBox(
                      height: height * 0.035,
                    ),
                    AnimatedSmoothIndicator(
                        activeIndex: currentIndex,
                        count: pages.length,
                        axisDirection: Axis.horizontal,
                        effect: WormEffect(
                            spacing: 8.0,
                            dotWidth: width * 0.03,
                            dotHeight: width * 0.03,
                            paintStyle: PaintingStyle.stroke,
                            strokeWidth: 1.5,
                            dotColor: Colors.grey,
                            activeDotColor:
                                const Color.fromARGB(209, 52, 168, 83))),
                  ],
                ),
              ),
              Padding(
                padding: EdgeInsets.only(
                  top: height * 0.65,
                ),
                child: Column(
                  children: [
                    GestureDetector(
                      onTap: () => Get.off(() => const SignIn()),
                      child: Container(
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
