import 'package:flutter/material.dart';
import 'package:green_life/shared/exports.dart';

class Buttons extends StatelessWidget {
  final String title, firstOption, secondOption, thirdOption;
  final String? fourthOption;
  final Function()? onTap;

  const Buttons(
      {super.key,
      required this.title,
      required this.firstOption,
      required this.secondOption,
      required this.thirdOption,
      required this.onTap,
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
        button(firstOption, width, height, onTap),
        SizedBox(
          height: height * 0.01,
        ),
        button(
          secondOption,
          width,
          height,
          onTap
        ),
        SizedBox(
          height: height * 0.01,
        ),
        button(thirdOption, width, height, onTap),
        SizedBox(
          height: height * 0.01,
        ),
        fourthOption != null || fourthOption!.isNotEmpty
            ? button(fourthOption!, width, height, onTap)
            : const SizedBox.shrink()
      ],
    );
  }

  Widget button(String option, double height, width, Function()? onTap) {
    return InkWell(
      onTap: onTap,
      child: Container(
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
      ),
    );
  }
}
