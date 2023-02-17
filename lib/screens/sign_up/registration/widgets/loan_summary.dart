import 'package:flutter/material.dart';

Widget loanSummary(
  String title,
  info,
  double width,
) {
  return Row(
    mainAxisAlignment: MainAxisAlignment.start,
    children: [
      Text(
        title,
        style: const TextStyle(
            fontSize: 14,
            height: 2,
            color: Colors.white,
            fontWeight: FontWeight.w500),
      ),
      const Expanded(
        child: SizedBox(),
      ),
      const Icon(
        Icons.more_vert,
        color: Colors.white,
      ),
      SizedBox(
        width: width * 0.15,
      ),
      Text(
        info,
        style: const TextStyle(color: Colors.white),
      )
    ],
  );
}
