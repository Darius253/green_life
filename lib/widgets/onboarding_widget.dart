import 'package:flutter/material.dart';

Widget onboardingPages(
    double width, double height, String header, String about, String image) {
  return Column(children: [
    Container(
      height: height * 0.3,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(36),
        color: Colors.grey,
      ),
    ),
    SizedBox(
      height: height * 0.02,
    ),
    Center(
      child: Text(
        header,
        textAlign: TextAlign.center,
        style: const TextStyle(
            fontWeight: FontWeight.w700,
            fontSize: 32,
            color: Color.fromARGB(221, 81, 81, 81)),
      ),
    ),
    Expanded(
      child: Text(
        about,
        textAlign: TextAlign.center,
        style: const TextStyle(
            fontWeight: FontWeight.w400, fontSize: 16, color: Colors.black),
      ),
    ),
  ]);
}
