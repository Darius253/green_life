import 'package:flutter/material.dart';

class TopBar extends StatelessWidget {
  final String position;
  const TopBar({
    super.key,
    required this.position,
  });

  @override
  Widget build(BuildContext context) {
    final double width = MediaQuery.of(context).size.height;

    return Row(
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        SizedBox(
          width: width * 0.02,
        ),
        const CircleAvatar(
          backgroundColor: Colors.white24,
          radius: 20,
          child: CircleAvatar(
            backgroundImage: AssetImage('assets/images/avatar.png'),
            radius: 16,
          ),
        ),
        SizedBox(
          width: width * 0.02,
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Welcome',
              style: TextStyle(
                fontSize: 14,
                color: Color(0xFFFB2B2B2),
                fontWeight: FontWeight.w400,
              ),
            ),
            const SizedBox(
              width: 5,
            ),
            Text(
              position,
              style: const TextStyle(
                fontSize: 15,
                color: Colors.black,
                fontWeight: FontWeight.w400,
              ),
            ),
          ],
        ),
        SizedBox(
          width: width * 0.12,
        ),
        const Icon(
          Icons.menu,
          color: Colors.black,
          size: 25,
        )
      ],
    );
  }
}
