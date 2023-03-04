import 'package:flutter/material.dart';

class DrawerModel extends StatelessWidget {
  const DrawerModel(
      {Key? key,
      required this.name,
      required this.icon,
      required this.onPressed})
      : super(key: key);

  final String name;
  final IconData icon;
  final Function() onPressed;

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return InkWell(
      onTap: onPressed,
      child: SizedBox(
        height: height * 0.06,
        child: Row(
          children: [
            Icon(
              icon,
              size: 20,
              color: Colors.green,
            ),
           SizedBox(
              width: width * 0.06,
            ),
            Text(
              name,
              style: const TextStyle(
                  fontSize: 16,
                  color: Colors.black,
                  fontWeight: FontWeight.w500),
            )
          ],
        ),
      ),
    );
  }
}
