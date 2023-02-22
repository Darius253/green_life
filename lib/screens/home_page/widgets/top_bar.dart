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
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        const CircleAvatar(
          backgroundColor: Colors.white24,
          radius: 20,
          child: CircleAvatar(
            backgroundImage: AssetImage('assets/images/avatar.png'),
            radius: 20,
          ),
        ),
        SizedBox(
          width: width * 0.18,
        ),
        Column(
          children: [
            const Text(
              'Welcome',
              style: TextStyle(
                fontSize: 20,
                color: Color.fromARGB(255, 88, 88, 88),
                fontWeight: FontWeight.w400,
              ),
            ),
            const SizedBox(
              width: 5,
            ),
            Text(
              position,
              style: const TextStyle(
                fontSize: 20,
                color: Color.fromARGB(255, 88, 88, 88),
                fontWeight: FontWeight.w400,
              ),
            ),
          ],
        ),
        const Icon(
          Icons.menu,
          size: 20,
        )
      ],
    );
  }
}
