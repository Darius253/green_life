import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:green_life/screens/forgot_password/verify_email.dart';
import '../../shared/exports.dart';

class ForgotPassword extends StatefulWidget {
  const ForgotPassword({super.key});

  @override
  State<ForgotPassword> createState() => _ForgotPasswordState();
}

class _ForgotPasswordState extends State<ForgotPassword> {
  final controller = TextEditingController();
  final formKey = GlobalKey<FormState>();
  String email = '';
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
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        backButton(Colors.black),
                        SizedBox(width: width * 0.2),
                        const Text(
                          'Forgot Password',
                          style: TextStyle(
                              fontSize: 21, fontWeight: FontWeight.w500),
                        ),
                        const Expanded(child: SizedBox())
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
                              'assets/images/Password_Two Color.svg')),
                    ),
                    SizedBox(
                      height: height * 0.04,
                    ),
                    const Center(
                      child: Text(
                        'Please Enter Your Email Address To Receive a Verification Code.',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontSize: 17, fontWeight: FontWeight.w500),
                      ),
                    ),
                    SizedBox(
                      height: height * 0.07,
                    ),
                    Center(
                      child: TextFormField(
                        keyboardType: TextInputType.emailAddress,
                        controller: controller,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Field cannot be empty';
                          }
                          return null;
                        },
                        onChanged: (value) {
                          email = value;
                        },
                        onFieldSubmitted: (value) {
                          email = value;
                        },
                        onSaved: (value) {
                          email = value!;
                        },
                        decoration: InputDecoration(
                          label: const Text(
                            'Email Address',
                            style: TextStyle(
                                fontWeight: FontWeight.w400, fontSize: 13),
                          ),
                          labelStyle: const TextStyle(
                            color: Color.fromARGB(251, 178, 178, 178),
                          ),
                          focusColor: const Color.fromARGB(255, 52, 168, 83),
                          focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(
                                color: Color.fromARGB(255, 169, 169, 169),
                              ),
                              borderRadius: BorderRadius.circular(20)),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: height * 0.05,
                    ),
                    button(height * 0.07, width * 0.7, () {
                      if (formKey.currentState!.validate()) {
                        Get.off(VerifyEmail(email: email));
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
