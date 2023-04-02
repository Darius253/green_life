import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../shared/exports.dart';

class CreateNewPassword extends StatefulWidget {
  const CreateNewPassword({super.key});

  @override
  State<CreateNewPassword> createState() => _CreateNewPasswordState();
}

class _CreateNewPasswordState extends State<CreateNewPassword> {
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();
  final formKey = GlobalKey<FormState>();
  String password = '';
  String confirmPassword = '';
  bool obscurePassword = true;
  bool obscurePassword2 = true;
  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return Scaffold(
      body: SafeArea(
          child: Stack(
        children: [
          Padding(
            padding: EdgeInsets.only(top: height * 0.73),
            child: Image.asset('assets/images/vector.png'),
          ),
          Padding(
            padding: EdgeInsets.symmetric(
                horizontal: width * 0.07, vertical: height * 0.03),
            child: SingleChildScrollView(
              child: Form(
                key: formKey,
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Text(
                          'Create New Password',
                          style: TextStyle(
                              fontSize: 21, fontWeight: FontWeight.w500),
                        ),
                      ],
                    ),
                    SizedBox(
                      height: height * 0.02,
                    ),
                    Container(
                      width: width * 0.6,
                      height: height * 0.3,
                      decoration: const BoxDecoration(
                          shape: BoxShape.circle,
                          color: Color.fromARGB(253, 231, 255, 237)),
                      child: Center(
                          child: SvgPicture.asset(
                              'assets/images/Password_Monochromatic.svg')),
                    ),
                    SizedBox(
                      height: height * 0.04,
                    ),
                    const Center(
                      child: Text(
                        'Your New Password Must be Different from Previously Used Password.',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontSize: 17, fontWeight: FontWeight.w500),
                      ),
                    ),
                    SizedBox(
                      height: height * 0.07,
                    ),
                    //Password Field
                    TextFormField(
                      controller: passwordController,
                      obscureText: obscurePassword,
                      validator: (value) {
                        if (value!.isEmpty) {
                          return 'Password field cannot be empty';
                        }
                        return null;
                      },
                      onChanged: (value) {
                        password = value;
                      },
                      autovalidateMode: AutovalidateMode.onUserInteraction,
                      decoration: InputDecoration(
                          hintText: 'Password',
                          suffixIcon: obscurePassword == true
                              ? IconButton(
                                  icon: const Icon(
                                    CupertinoIcons.eye_slash,
                                    color: Color.fromARGB(213, 178, 178, 178),
                                  ),
                                  onPressed: () {
                                    setState(() {
                                      obscurePassword = !obscurePassword;
                                    });
                                  },
                                )
                              : IconButton(
                                  icon: const Icon(CupertinoIcons.eye,
                                      color:
                                          Color.fromARGB(213, 178, 178, 178)),
                                  onPressed: () {
                                    setState(() {
                                      obscurePassword = !obscurePassword;
                                    });
                                  },
                                ),
                          contentPadding: EdgeInsets.symmetric(
                              horizontal: width * 0.09,
                              vertical: height * 0.025),
                          hintStyle: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w400,
                              color: Color.fromARGB(218, 178, 178, 178)),
                          border: OutlineInputBorder(
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(211, 52, 168, 83)),
                              borderRadius: BorderRadius.circular(20)),
                          enabledBorder: OutlineInputBorder(
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(211, 52, 168, 83)),
                              borderRadius: BorderRadius.circular(20)),
                          errorBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(20),
                            borderSide: const BorderSide(
                                color: Color.fromARGB(210, 231, 7, 7)),
                          ),
                          focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(211, 52, 168, 83)),
                              borderRadius: BorderRadius.circular(20))),
                    ),
                    SizedBox(
                      height: height * 0.02,
                    ),
                    //ConfirmPassword Field
                    TextFormField(
                      controller: confirmPasswordController,
                      obscureText: obscurePassword2,
                      validator: (value) {
                        if (value != password) {
                          return 'Passwords do not match';
                        }
                        return null;
                      },
                      onChanged: (value) {
                        confirmPassword = value;
                      },
                      autovalidateMode: AutovalidateMode.onUserInteraction,
                      decoration: InputDecoration(
                          hintText: 'Confirm Password',
                          suffixIcon: obscurePassword2 == true
                              ? IconButton(
                                  icon: const Icon(
                                    CupertinoIcons.eye_slash,
                                    color: Color.fromARGB(213, 178, 178, 178),
                                  ),
                                  onPressed: () {
                                    setState(() {
                                      obscurePassword2 = !obscurePassword2;
                                    });
                                  },
                                )
                              : IconButton(
                                  icon: const Icon(CupertinoIcons.eye,
                                      color:
                                          Color.fromARGB(213, 178, 178, 178)),
                                  onPressed: () {
                                    setState(() {
                                      obscurePassword2 = !obscurePassword2;
                                    });
                                  },
                                ),
                          contentPadding: EdgeInsets.symmetric(
                              horizontal: width * 0.09,
                              vertical: height * 0.025),
                          hintStyle: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w400,
                              color: Color.fromARGB(218, 178, 178, 178)),
                          border: OutlineInputBorder(
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(211, 52, 168, 83)),
                              borderRadius: BorderRadius.circular(20)),
                          enabledBorder: OutlineInputBorder(
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(211, 52, 168, 83)),
                              borderRadius: BorderRadius.circular(20)),
                          errorBorder: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(20),
                            borderSide: const BorderSide(
                                color: Color.fromARGB(210, 231, 7, 7)),
                          ),
                          focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(
                                  color: Color.fromARGB(211, 52, 168, 83)),
                              borderRadius: BorderRadius.circular(20))),
                    ),
                    SizedBox(
                      height: height * 0.05,
                    ),
                    button(height * 0.07, width * 0.7, () {
                      if (formKey.currentState!.validate() &&
                          password == confirmPassword) {
                        Get.off(const SignIn());
                      }
                    }, 'Send', const Color.fromARGB(255, 52, 168, 83), 24,
                        Colors.white)
                  ],
                ),
              ),
            ),
          ),
        ],
      )),
    );
  }
}
