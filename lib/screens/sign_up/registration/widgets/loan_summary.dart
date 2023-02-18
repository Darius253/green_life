import 'package:flutter/material.dart';
import 'package:green_life/shared/exports.dart';

import '../../../../widgets/button.dart';

Widget loanSummary(
  String title,
  info,
  double width,
  Color color,
  double space,
) {
  return Row(
    crossAxisAlignment: CrossAxisAlignment.center,
    children: [
      Text(
        title,
        style: TextStyle(
            fontSize: 16, height: 2, color: color, fontWeight: FontWeight.w500),
      ),
      SizedBox(
        width: space,
      ),
      Icon(
        Icons.more_vert,
        color: color,
      ),
      const Expanded(
        child: SizedBox(),
      ),
      Text(
        info,
        style: TextStyle(
            fontSize: 16, height: 2, color: color, fontWeight: FontWeight.w500),
      )
    ],
  );
}

class AmountSummary extends StatefulWidget {
  final int pageIndex;
  final List<Widget> pages;
  final Function()? onTap;
  final PageController pageController;

  const AmountSummary(
      {super.key,
      required this.pages,
      required this.pageIndex,
      required this.pageController,
      required this.onTap});

  @override
  State<AmountSummary> createState() => _AmountSummaryState();
}

double firstSliderValue = 1000;
double seconderSliderValue = 1;

class _AmountSummaryState extends State<AmountSummary> {
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Container(
      height: height,
      decoration: const BoxDecoration(
          gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
            Color.fromARGB(255, 0, 127, 95),
            Color.fromARGB(255, 52, 168, 83)
          ])),
      child: Padding(
          padding: EdgeInsets.symmetric(
              horizontal: width * 0.05, vertical: height * 0.03),
          child: SingleChildScrollView(
            child: Column(
              children: [
                Text(
                  'STEP ${widget.pageIndex + 5}/${widget.pages.length}',
                  style: const TextStyle(
                      fontWeight: FontWeight.w500, fontSize: 15),
                ),
                SizedBox(
                  height: height * 0.03,
                ),
                Row(children: [
                  backButton(Colors.white),
                  Padding(
                    padding: EdgeInsets.only(left: width * 0.1),
                    child: const Text(
                      'Fill the following options\n to choose how much\n you want to borrow and\n for how long?',
                      style: TextStyle(
                          fontWeight: FontWeight.w500,
                          fontSize: 15,
                          color: Colors.white),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ]),
                SizedBox(
                  height: height * 0.05,
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: width * 0.05),
                  child: Row(
                    children: const [
                      Text(
                        '¢1000',
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                      Expanded(child: SizedBox()),
                      Text(
                        '¢6000',
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                    ],
                  ),
                ),
                Slider.adaptive(
                  activeColor: Colors.white,
                  value: firstSliderValue,
                  min: 1000,
                  max: 6000,
                  divisions: 6000,
                  label: '¢${firstSliderValue.round().toString()}',
                  onChanged: (double value) {
                    setState(() {
                      firstSliderValue = value;
                    });
                  },
                ),
                SizedBox(
                  height: height * 0.1,
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: width * 0.05),
                  child: Row(
                    children: const [
                      Text(
                        '1 month',
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                      Expanded(child: SizedBox()),
                      Text(
                        '12 months',
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                    ],
                  ),
                ),
                Slider.adaptive(
                  activeColor: Colors.white,
                  value: seconderSliderValue,
                  min: 1,
                  max: 12,
                  divisions: 12,
                  label: '${seconderSliderValue.round().toString()} months',
                  onChanged: (double value) {
                    setState(() {
                      seconderSliderValue = value;
                    });
                  },
                ),
                SizedBox(
                  height: height * 0.04,
                ),
                Container(
                  width: width,
                  height: height * 0.3,
                  decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(15),
                      color: const Color.fromARGB(255, 3, 85, 64)),
                  child: Padding(
                    padding: EdgeInsets.symmetric(
                        vertical: height * 0.03, horizontal: width * 0.1),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        loanSummary(
                            'Loan Amount',
                            '¢${firstSliderValue.round().toString()}',
                            width,
                            Colors.white,
                            width * 0.1),
                        loanSummary('Interest', 'Hello', width, Colors.white,
                            width * 0.2),
                        loanSummary('Pay per month', 'Hello', width,
                            Colors.white, width * 0.075),
                        loanSummary(
                            'Deadline',
                            '${seconderSliderValue.round().toString()} months',
                            width,
                            Colors.white,
                            width * 0.18),
                        SizedBox(
                          height: height * 0.03,
                        ),
                        loanSummary('Total Amount', 'Hello', width,
                            Colors.white, width * 0.1),
                      ],
                    ),
                  ),
                ),
                SizedBox(
                  height: height * 0.02,
                ),
                InkWell(
                  onTap: widget.onTap,
                  child: Container(
                      width: width,
                      height: height * 0.07,
                      decoration: const BoxDecoration(
                          color: Color.fromARGB(255, 255, 217, 2)),
                      child: const Center(child: Text('Apply Now'))),
                ),
              ],
            ),
          )),
    );
  }
}
