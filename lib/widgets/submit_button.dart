import 'package:flutter/material.dart';

class SubmitButton extends StatelessWidget {
  final Function() ontap;
  const SubmitButton({super.key, required this.ontap});

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return ElevatedButton(
      onPressed: ontap,
      style: ElevatedButton.styleFrom(
          backgroundColor: const Color.fromARGB(207, 52, 168, 83),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(18)),
          minimumSize: Size(width * 0.20, height * 0.05),
          elevation: 5,
          shadowColor: const Color.fromARGB(255, 185, 184, 184)),
      child: const Text(
        'Submit',
        style: TextStyle(
            fontWeight: FontWeight.w400, fontSize: 15, color: Colors.white),
      ),
    );
  }
}
