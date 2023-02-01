import 'package:flutter/material.dart';

Widget button(double height, width, Function() ontap, String text) {
  return GestureDetector(
    onTap: ontap,
    child: Container(
      height: height * 0.08,
      width: width,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(40),
          color: const Color.fromARGB(207, 52, 168, 83)),
      child: Center(
        child: Text(
          text,
          style: const TextStyle(
              fontWeight: FontWeight.w700, fontSize: 24, color: Colors.white),
        ),
      ),
    ),
  );
}
