import 'package:flutter/material.dart';

Widget textform(String hint, TextInputType? keyboardType, Widget? suffixIcon, bool password) {
  return TextFormField(
    keyboardType: keyboardType,
    obscureText:password,
    decoration: InputDecoration(
        hintText: hint,
        suffixIcon: suffixIcon,
        hintStyle: const TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w400,
            color: Color.fromARGB(218, 178, 178, 178)),
        enabledBorder: OutlineInputBorder(
            borderSide:
                const BorderSide(color: Color.fromARGB(211, 52, 168, 83)),
            borderRadius: BorderRadius.circular(20)),
        errorBorder:
            OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
        focusedBorder: OutlineInputBorder(
            borderSide:
                const BorderSide(color: Color.fromARGB(211, 52, 168, 83)),
            borderRadius: BorderRadius.circular(20))),
  );
}

Widget loginOrsignin(String initial, later) {
  return Text.rich(
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
  );
}
