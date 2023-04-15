import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:green_life/screens/home_page/home.dart';
import 'package:green_life/screens/home_page/widgets/drawer_widget.dart';
import 'package:green_life/shared/exports.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int currentpageIndex = 0;
  final pageController = PageController(initialPage: 0);
  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    List<Widget> pages = [
      const Home(),
      const NotificationPage(),
    ];
    return Scaffold(
      drawer: const DrawerWidget(),
      body: SafeArea(
        child: Stack(
          children: [
            Positioned(
                bottom: 1,
                left: 0.0,
                right: 0.0,
                child: Container(
                    width: width,
                    height: height * 0.09,
                    decoration: const BoxDecoration(color: Colors.transparent),
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          // Home
                          navBarItem(
                              'Home',
                              height,
                              Icons.home_filled,
                              currentpageIndex == 0
                                  ? const Color.fromARGB(255, 52, 168, 83)
                                  : const Color.fromARGB(255, 137, 134, 134),
                              () {
                            setState(() {
                              currentpageIndex = 0;
                            });
                            pageController.animateToPage(0,
                                duration: const Duration(milliseconds: 200),
                                curve: Curves.bounceIn);
                            print('home');
                          }),
                          navBarItem(
                              'Notification',
                              height,
                              Icons.notifications_sharp,
                              currentpageIndex == 1
                                  ? const Color.fromARGB(255, 52, 168, 83)
                                  : const Color.fromARGB(255, 137, 134, 134),
                              () {
                            setState(() {
                              currentpageIndex = 1;
                            });
                            pageController.animateToPage(1,
                                duration: const Duration(milliseconds: 200),
                                curve: Curves.bounceIn);
                            print('Notification');
                          }),
                          navBarItem(
                              'Confirm Loan',
                              height,
                              CupertinoIcons.check_mark_circled_solid,
                              currentpageIndex == 2
                                  ? const Color.fromARGB(255, 52, 168, 83)
                                  : const Color.fromARGB(255, 137, 134, 134),
                              () {
                            setState(() {
                              currentpageIndex = 2;
                            });
                            pageController.animateToPage(2,
                                duration: const Duration(milliseconds: 200),
                                curve: Curves.bounceIn);
                            print('Confirm Loan');
                          }),
                        ]))),
            PageView(
              scrollDirection: Axis.horizontal,
              physics: const NeverScrollableScrollPhysics(),
              controller: pageController,
              onPageChanged: (value) {
                currentpageIndex = value;
              },
              children: pages,
            )
          ],
        ),
      ),
    );
  }

  Widget navBarItem(String itemName, double height, IconData icon, Color color,
      Function()? ontap) {
    return InkWell(
      onTap: ontap,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          Icon(
            icon,
            color: color,
            size: height * 0.03,
          ),
          Text(
            itemName,
            style: TextStyle(color: color),
          ),
        ],
      ),
    );
  }
}
