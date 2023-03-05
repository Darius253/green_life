import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:green_life/screens/sign_up/registration/registration_page.dart';
import 'package:green_life/shared/exports.dart';

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
      OnboardingPages(
          width: width,
          height: height,
          header: 'Fast Online Process',
          about: 'Our App allows fast, secure online loan applications.',
          image: 'assets/images/1.jpg'),
      OnboardingPages(
          width: width,
          height: height,
          header: 'Fair Charges',
          about:
              'Our interest rate is lower, with no hidden charges and processing fees.',
          image: 'assets/images/2.jpg'),
      OnboardingPages(
          width: width,
          height: height,
          header: 'Instant Deposit',
          about:
              'Immediate deposit into your account after you can confirm the loan.',
          image: 'assets/images/3.jpg'),
      OnboardingPages(
        width: width,
        height: height,
        header: 'Flexible Payment',
        about: 'Flexible repayments for your convenience.',
        image: 'assets/images/4.jpg',
      ),
    ];

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
            child: Stack(
          children: [
            CarouselSlider(
                items: pages,
                carouselController: controller,
                options: CarouselOptions(
                  height: height,
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
                  enlargeFactor: 0.0,
                  onPageChanged: (index, reason) {
                    setState(() {
                      currentIndex = index;
                    });
                  },
                  scrollDirection: Axis.horizontal,
                )),
            Center(
              child: Padding(
                padding: EdgeInsets.only(top: height * 0.7),
                child: AnimatedSmoothIndicator(
                    activeIndex: currentIndex,
                    count: pages.length,
                    axisDirection: Axis.horizontal,
                    effect: WormEffect(
                        spacing: 8.0,
                        dotWidth: width * 0.03,
                        dotHeight: width * 0.03,
                        paintStyle: PaintingStyle.stroke,
                        strokeWidth: 1.5,
                        dotColor: const Color.fromARGB(255, 255, 251, 251),
                        activeDotColor:
                            const Color.fromARGB(209, 52, 168, 83))),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: width * 0.08, vertical: height * 0.03),
              child: Row(
                children: [
                  SizedBox(
                    width: width * 0.3,
                  ),
                  Image.asset(
                    'assets/images/logo_green.png',
                    height: height * 0.08,
                    filterQuality: FilterQuality.high,
                  ),
                  const Expanded(child: SizedBox()),
                  InkWell(
                    child: Container(
                        height: height * 0.029,
                        width: width * 0.15,
                        decoration: BoxDecoration(
                            color: const Color.fromARGB(255, 217, 241, 223),
                            borderRadius: BorderRadius.circular(20)),
                        child: const Center(
                          child: Text(
                            'Skip',
                            style: TextStyle(
                                color: Color.fromARGB(216, 85, 84, 84),
                                fontWeight: FontWeight.w500),
                          ),
                        )),
                  )
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                  top: height * 0.75, left: width * 0.05, right: width * 0.05),
              child: Column(
                children: [
                  Row(
                    children: [
                      button(
                          height * 0.065,
                          width * 0.4,
                          () => Get.off(() => const SignIn()),
                          'LOGIN',
                          Colors.white,
                          Colors.green),
                      const Expanded(child: SizedBox()),
                      button(
                          height * 0.065,
                          width * 0.4,
                          () => Get.off(() => const SignUp()),
                          'GET STARTED',
                          Colors.green,
                          Colors.white),
                    ],
                  ),
                  SizedBox(
                    height: height * 0.02,
                  ),
                  const Text(
                    "Have an Ongoing Application?",
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w400),
                  ),
                  InkWell(
                    child: const Text(
                      "RESUME/TRACK APPLICATION",
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          height: 2,
                          fontWeight: FontWeight.w600),
                    ),
                    onTap: () => Get.to(() => const RegistrationPage()),
                  )
                ],
              ),
            ),
          ],
        )),
      ),
    );
  }
}
