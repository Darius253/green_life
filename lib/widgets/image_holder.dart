import 'package:flutter/material.dart';

class ImageHolder extends StatelessWidget {
  const ImageHolder({super.key});

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return Container(
      height: height * 0.31,
      width: width * 0.73,
      decoration: BoxDecoration(
        color: const Color(0xfffd9d9d9),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Center(
        child: Image.asset('assets/images/camera.png', height: 160, width: 160,),
      ),
    );
  }
}