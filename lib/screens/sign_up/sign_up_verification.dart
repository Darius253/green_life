import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:pin_code_fields/pin_code_fields.dart';
import '../../shared/exports.dart';

class SignupVerification extends StatefulWidget {
  final String email;
  const SignupVerification({
    super.key,
    required this.email,
  });

  @override
  State<SignupVerification> createState() => _SignupVerificationState();
}

class _SignupVerificationState extends State<SignupVerification> {
  final controller = TextEditingController();
  late StreamController<ErrorAnimationType> errorController;
  final formKey = GlobalKey<FormState>();
  String code = '';
  bool hasError = false;

  @override
  void initState() {
    errorController = StreamController<ErrorAnimationType>();
    super.initState();
  }

  @override
  void dispose() {
    errorController.close();

    super.dispose();
  }

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
                          'Signup Verification',
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
                      width: width * 0.5,
                      height: height * 0.25,
                      decoration: BoxDecoration(
                          color: const Color.fromARGB(255, 231, 255, 237),
                          borderRadius: BorderRadius.circular(100)),
                      child: Center(
                          child: SvgPicture.asset(
                              'assets/images/Notifications_Outline.svg')),
                    ),
                    SizedBox(
                      height: height * 0.04,
                    ),
                    Center(
                      child: RichText(
                        text: TextSpan(
                            text: "Please Enter The 4 Digit Code Sent To ",
                            children: [
                              TextSpan(
                                  text: "${widget.email} to Signup",
                                  style: const TextStyle(
                                      color: Color.fromARGB(255, 0, 0, 0),
                                      fontWeight: FontWeight.w500,
                                      fontSize: 17)),
                            ],
                            style: const TextStyle(
                              color: Color.fromARGB(255, 0, 0, 0),
                              fontSize: 17,
                              fontWeight: FontWeight.w500,
                            )),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    SizedBox(
                      height: height * 0.07,
                    ),
                    PinCodeTextField(
                      validator: (v) {
                        if (v!.length < 4) {
                          return "Digits cannot be less than 4";
                        } else {
                          return null;
                        }
                      },
                      length: 4,
                      obscureText: false,
                      animationType: AnimationType.fade,
                      pinTheme: PinTheme(
                        shape: PinCodeFieldShape.box,
                        borderRadius: BorderRadius.circular(5),
                        fieldHeight: height * 0.08,
                        fieldWidth: width * 0.18,
                        disabledColor: Colors.white,
                        inactiveFillColor:
                            const Color.fromARGB(255, 231, 255, 237),
                        inactiveColor: Colors.green,
                        selectedColor: Colors.green,
                        selectedFillColor:
                            const Color.fromARGB(255, 231, 255, 237),
                        activeFillColor:
                            const Color.fromARGB(255, 231, 255, 237),
                      ),
                      animationDuration: const Duration(milliseconds: 300),
                      enableActiveFill: true,
                      errorAnimationController: errorController,
                      controller: controller,
                      onCompleted: (v) {
                        print("Completed");
                      },
                      onChanged: (value) {
                        print(value);
                        setState(() {
                          code = value;
                        });
                      },
                      appContext: context,
                    ),
                    SizedBox(
                      height: height * 0.025,
                    ),
                    TextButton(
                        onPressed: () {},
                        child: const Text(
                          'Resend Code',
                          style: TextStyle(
                              color: Color.fromARGB(255, 52, 168, 83),
                              decoration: TextDecoration.underline),
                        )),
                    button(height * 0.07, width * 0.7, () {
                      if (formKey.currentState!.validate()) {
                        Get.off(const LoanType());
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
