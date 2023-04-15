import 'package:flutter/material.dart';

class GreenButton extends StatelessWidget {
  final String btext;
  const GreenButton({super.key, required this.btext});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.bottomRight,
      child: Container(
        margin: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(
            color: Colors.green,
            width: 1,
          ),
        ),
        child:  Padding(
          padding: const EdgeInsets.all(6.0),
          child: Text(
            btext,
            style: const TextStyle(fontSize: 10, color: Colors.green),
          ),
        ),
      ),
    );
  }
}
