import 'package:flutter/material.dart';

class Buttons extends StatelessWidget {
  final String title, firstOption, secondOption, thirdOption;
  final String? fourthOption;

  const Buttons(
      {super.key,
      required this.title,
      required this.firstOption,
      required this.secondOption,
      required this.thirdOption,
      this.fourthOption});

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          title,
          style: const TextStyle(
            wordSpacing: 2.5,
            fontSize: 20,
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(
          height: height * 0.02,
        ),
        button(firstOption, width, height),
        SizedBox(
          height: height * 0.01,
        ),
        button(secondOption, width, height),
        SizedBox(
          height: height * 0.01,
        ),
        button(thirdOption, width, height),
        SizedBox(
          height: height * 0.01,
        ),
        fourthOption != null || fourthOption!.isNotEmpty
            ? button(fourthOption!, width, height)
            : const SizedBox.shrink()
      ],
    );
  }

  Widget button(String option, double height, width) {
    return Container(
      height: height * 0.09,
      width: width * 0.5,
      decoration: BoxDecoration(
          color: const Color.fromARGB(230, 214, 247, 222),
          borderRadius: BorderRadius.circular(10)),
      child: Center(
        child: Text(
          option,
          style: const TextStyle(
              color: Colors.black, fontSize: 14, fontWeight: FontWeight.w400),
        ),
      ),
    );
  }
}
