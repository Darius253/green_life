import 'package:flutter/material.dart';

Widget textform(
    String hint,
    double width,
    double height,
    TextInputType? keyboardType,
    TextEditingController controller,
    Function(String?) onchanged) {
  return TextFormField(
    keyboardType: keyboardType,
    controller: controller,
    validator: (value) {
      if (value!.isEmpty) {
        return 'Please provide details for this field';
      }
      return null;
    },
    onChanged: onchanged,
    autovalidateMode: AutovalidateMode.onUserInteraction,
    decoration: InputDecoration(
        contentPadding: EdgeInsets.symmetric(
            horizontal: width * 0.04, vertical: height * 0.05),
        hintText: hint,
        hintStyle: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: Color.fromARGB(218, 178, 178, 178)),
        border: OutlineInputBorder(
            borderSide:
                const BorderSide(color: Color.fromARGB(211, 52, 168, 83)),
            borderRadius: BorderRadius.circular(20)),
        enabledBorder: OutlineInputBorder(
            borderSide:
                const BorderSide(color: Color.fromARGB(211, 52, 168, 83)),
            borderRadius: BorderRadius.circular(20)),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(20),
          borderSide: const BorderSide(color: Color.fromARGB(210, 231, 7, 7)),
        ),
        focusedBorder: OutlineInputBorder(
            borderSide:
                const BorderSide(color: Color.fromARGB(211, 52, 168, 83)),
            borderRadius: BorderRadius.circular(20))),
  );
}

Widget loginOrsignin(String initial, later, Function() onTap) {
  return GestureDetector(
    onTap: onTap,
    child: Text.rich(
      TextSpan(children: <TextSpan>[
        TextSpan(
          text: initial,
          style: const TextStyle(
              fontWeight: FontWeight.w400, fontSize: 18, color: Colors.black),
        ),
        TextSpan(
          text: later,
          style: const TextStyle(
              fontWeight: FontWeight.w400, fontSize: 18, color: Colors.green),
        )
      ]),
    ),
  );
}
