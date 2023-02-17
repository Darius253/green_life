import 'package:flutter/material.dart';

class SelectDocument extends StatelessWidget {
  const SelectDocument({super.key});

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return ElevatedButton.icon(
      onPressed: () {},
      icon: Image.asset(
        'assets/images/camera.png',
        height: 45,
        width: 45,
      ),
      label: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Text(
            'Select the document from Gallery',
            style: TextStyle(
                fontSize: 12, color: Colors.black, fontWeight: FontWeight.w500),
          ),
          SizedBox(
            height: 1,
          ),
          Text(
            'PNG, JPEG OR PDF',
            style: TextStyle(
                fontSize: 11,
                color: Colors.white70,
                fontWeight: FontWeight.w500),
          )
        ],
      ),
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xfffd9d9d9),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        elevation: 0,
        minimumSize: Size(width * 0.72, height * 0.06),
      ),
    );
  }
}
