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
    didChangeDependencies();
    {
      precacheImage(AssetImage(widget.image), context);
    }

    return Column(children: [
      ClipRRect(
        borderRadius: BorderRadius.circular(36),
        child: Container(
          height: widget.height * 0.25,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(36),
            color: Colors.grey,
          ),
          child: Image(
            image: AssetImage(widget.image),
          ),
        ),
      ),
      SizedBox(
        height: widget.height * 0.02,
      ),
      Center(
        child: Text(
          widget.header,
          textAlign: TextAlign.center,
          style: const TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 32,
              color: Color.fromARGB(221, 81, 81, 81)),
        ),
      ),
      Expanded(
        child: Text(
          widget.about,
          textAlign: TextAlign.center,
          style: const TextStyle(
              fontWeight: FontWeight.w400, fontSize: 16, color: Colors.black),
        ),
      ),
    ]);
  }
}
