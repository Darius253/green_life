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
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const CircleAvatar(
          backgroundImage: AssetImage('assets/images/avatar.png'),
          radius: 16,
        ),
        SizedBox(
          width: width * 0.015,
        ),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Welcome',
              style: TextStyle(
                fontSize: 14,
                color: Color.fromARGB(211, 178, 178, 178),
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
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
        const Expanded(
          child: SizedBox(),
        ),
        IconButton(
          icon: const Icon(
            Icons.menu,
            color: Colors.black,
            size: 25,
          ),
          onPressed: () {
            Scaffold.of(context).openDrawer();
          },
        )
      ],
    );
  }
}
