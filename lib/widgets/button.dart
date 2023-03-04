import 'package:flutter/material.dart';
import '../shared/exports.dart';

Widget button(double height, width, Function() ontap, String text, Color? color,
    Color textColor) {
  return GestureDetector(
    onTap: ontap,
    child: Container(
      height: height,
      width: width,
      decoration:
          BoxDecoration(borderRadius: BorderRadius.circular(40), color: color),
      child: Center(
        child: Text(
          text,
          style: TextStyle(
              fontWeight: FontWeight.w700, fontSize: 18, color: textColor),
        ),
      ),
    ),
  );
}

Widget backButton(Color color) {
  return IconButton(
      onPressed: () => Get.back(),
      icon: Icon(
        Icons.arrow_back_ios,
        color: color,
      ));
}
