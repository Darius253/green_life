import 'dart:ui';

import 'package:flutter/material.dart';

class OnboardingPages extends StatefulWidget {
  final double width;

  final double height;

  final String header;

  final String about;

  final String image;

  const OnboardingPages({
    super.key,
    required this.about,
    required this.header,
    required this.height,
    required this.image,
    required this.width,
  });

  @override
  State<OnboardingPages> createState() => _OnboardingPagesState();
}

class _OnboardingPagesState extends State<OnboardingPages> {
  @override
  Widget build(BuildContext context) {
    return Stack(fit: StackFit.expand, children: [
      Container(
        height: widget.height,
        width: widget.width,
        decoration: BoxDecoration(
            image: DecorationImage(
          filterQuality: FilterQuality.high,
          image: AssetImage(widget.image),
          fit: BoxFit.cover,
        )),
      ),
      BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 2, sigmaY: 2),
        child: Container(
          color: Colors.black.withOpacity(0.5),
        ),
      ),
      Padding(
        padding: EdgeInsets.only(
            top: widget.height * 0.55,
            left: widget.width * 0.1,
            right: widget.width * 0.1),
        child: Column(
          children: [
            Center(
              child: Text(
                widget.header,
                textAlign: TextAlign.center,
                style: const TextStyle(
                    fontWeight: FontWeight.w700,
                    height: 2,
                    fontSize: 32,
                    color: Color.fromARGB(221, 255, 255, 255)),
              ),
            ),
            Expanded(
              child: Text(
                widget.about,
                textAlign: TextAlign.center,
                style: const TextStyle(
                    fontWeight: FontWeight.w400,
                    fontSize: 18,
                    color: Color.fromARGB(255, 255, 255, 255)),
              ),
            ),
          ],
        ),
      ),
    ]);
  }
}
