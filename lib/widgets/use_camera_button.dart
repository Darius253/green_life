import 'package:flutter/material.dart';

class UseCameraButton extends StatelessWidget {
  const UseCameraButton({super.key});

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return ElevatedButton.icon(
      onPressed: () {},
      icon: Image.asset(
        'assets/images/camera.png',
        height: 50,
        width: 50,
      ),
      label: const Text(
        'Use Camera',
        style: TextStyle(
            fontSize: 18, color: Colors.black, fontWeight: FontWeight.w500),
      ),
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFFFD4D700),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20)
        ),
        minimumSize: Size(width * 0.66, height * 0.05),
        elevation: 5,
        shadowColor: const Color.fromARGB(255, 185, 184, 184)
      ),
    );
  }
}
