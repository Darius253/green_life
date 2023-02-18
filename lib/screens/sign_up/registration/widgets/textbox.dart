import 'package:flutter/material.dart';

class RegistrationTextField extends StatelessWidget {
  final String hintText;
  final String title;
  final String? subtitle;
  final int index;
  // final GlobalKey<FormState> formkey;
  final Function()? onTap;
  final String? Function(String?)? validator;
  final TextEditingController controller;
  final Function(String?)? onChanged;
  final Function(String?)? onSaved;
  final TextInputType? keyboardType;
  const RegistrationTextField({
    super.key,
    required this.controller,
    required this.hintText,
    required this.title,
    required this.onTap,
    required this.index,
    // required this.formkey,
    required this.validator,
    required this.onChanged,
    required this.onSaved,
    required this.keyboardType,
    this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Form(
      // key: formkey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextFormField(
            controller: controller,
            keyboardType: keyboardType,
            validator: validator,
            onChanged: onChanged,
            onSaved: onSaved,
            decoration: InputDecoration(
                hintText: hintText,
                focusColor: const Color.fromARGB(237, 52, 168, 83),
                hintStyle: const TextStyle(
                    fontSize: 14,
                    color: Color.fromRGBO(178, 178, 178, 0.945),
                    fontWeight: FontWeight.w400)),
          ),
          SizedBox(
            height: height * 0.015,
          ),
          Text(
            title,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(
            height: height * 0.008,
          ),
          subtitle != null || subtitle!.isNotEmpty
              ? Text(
                  subtitle!,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: Color.fromARGB(255, 178, 178, 178),
                  ),
                )
              : const SizedBox.shrink(),
          SizedBox(
            height: height * 0.06,
          ),
          GestureDetector(
            onTap: onTap,
            child: Center(
              child: Container(
                width: width * 0.25,
                height: height * 0.05,
                decoration: BoxDecoration(
                    color: const Color.fromARGB(237, 52, 168, 83),
                    boxShadow: const [
                      BoxShadow(
                          color: Color.fromARGB(228, 52, 168, 83),
                          spreadRadius: 5,
                          blurRadius: 10),
                    ],
                    borderRadius: BorderRadius.circular(40)),
                child: const Center(
                    child: Text(
                  'Next',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w400,
                    color: Color.fromARGB(255, 255, 255, 255),
                  ),
                )),
              ),
            ),
          )
        ],
      ),
    );
  }
}
