import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:green_life/screens/sign_up/sign_up_verification.dart';
import 'package:green_life/shared/exports.dart';

class SignUp extends StatefulWidget {
  const SignUp({super.key});

  @override
  State<SignUp> createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  bool obscurePassword = false;
  final TextEditingController _mobileNumberController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  String email = '';
  String name = '';
  String phoneNumber = '';
  String password = '';
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Scaffold(
      body: Stack(
        children: [
          Padding(
            padding: EdgeInsets.only(top: height * 0.73),
            child: Image.asset('assets/images/vector.png'),
          ),
          SafeArea(
            child: Padding(
              padding: EdgeInsets.symmetric(
                  horizontal: width * 0.07, vertical: height * 0.03),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    backButton(Colors.black),
                    SizedBox(
                      height: height * 0.012,
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: width * 0.040),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Register Account',
                              style: TextStyle(
                                  fontSize: 24, fontWeight: FontWeight.w600),
                            ),
                            const Text(
                              "Let's help you register your account",
                              style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w400,
                                  color: Color.fromARGB(213, 178, 178, 178)),
                            ),
                            SizedBox(
                              height: height * 0.025,
                            ),
                            textform(
                              'Name',
                              height,
                              width,
                              TextInputType.name,
                              _nameController,
                              (value) {},
                            ),
                            SizedBox(
                              height: height * 0.02,
                            ),
                            textform(
                              'Mobile number',
                              height,
                              width,
                              TextInputType.number,
                              _mobileNumberController,
                              (value) {},
                            ),
                            SizedBox(
                              height: height * 0.02,
                            ),
                            textform(
                              'Email',
                              height,
                              width,
                              TextInputType.emailAddress,
                              _emailController,
                              (value) {
                                setState(() {
                                  email = value!;
                                });
                              },
                            ),
                            SizedBox(
                              height: height * 0.02,
                            ),
                            //Password Field
                            TextFormField(
                              controller: _passwordController,
                              obscureText: obscurePassword,
                              validator: (value) {
                                if (value!.isEmpty) {
                                  return 'Password field cannot be empty';
                                }
                                return null;
                              },
                              onChanged: (value) {},
                              autovalidateMode:
                                  AutovalidateMode.onUserInteraction,
                              decoration: InputDecoration(
                                  hintText: 'Password',
                                  suffixIcon: obscurePassword == true
                                      ? IconButton(
                                          icon: const Icon(
                                            CupertinoIcons.eye_slash,
                                            color: Color.fromARGB(
                                                213, 178, 178, 178),
                                          ),
                                          onPressed: () {
                                            setState(() {
                                              obscurePassword =
                                                  !obscurePassword;
                                            });
                                          },
                                        )
                                      : IconButton(
                                          icon: const Icon(CupertinoIcons.eye,
                                              color: Color.fromARGB(
                                                  213, 178, 178, 178)),
                                          onPressed: () {
                                            setState(() {
                                              obscurePassword =
                                                  !obscurePassword;
                                            });
                                          },
                                        ),
                                  contentPadding: EdgeInsets.symmetric(
                                      horizontal: width * 0.09,
                                      vertical: height * 0.025),
                                  hintStyle: const TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w400,
                                      color:
                                          Color.fromARGB(218, 178, 178, 178)),
                                  border: OutlineInputBorder(
                                      borderSide: const BorderSide(
                                          color:
                                              Color.fromARGB(211, 52, 168, 83)),
                                      borderRadius: BorderRadius.circular(20)),
                                  enabledBorder: OutlineInputBorder(
                                      borderSide: const BorderSide(
                                          color:
                                              Color.fromARGB(211, 52, 168, 83)),
                                      borderRadius: BorderRadius.circular(20)),
                                  errorBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(20),
                                    borderSide: const BorderSide(
                                        color: Color.fromARGB(210, 231, 7, 7)),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                      borderSide: const BorderSide(
                                          color:
                                              Color.fromARGB(211, 52, 168, 83)),
                                      borderRadius: BorderRadius.circular(20))),
                            ),
                            SizedBox(
                              height: height * 0.02,
                            ),
                            textform(
                              'Referral Code',
                              height,
                              width,
                              TextInputType.text,
                              _referralCode,
                              (value) {},
                            ),
                            SizedBox(
                              height: height * 0.07,
                            ),
                            button(height * 0.08, width, () {
                              if (_formKey.currentState!.validate()) {
                                Get.to(() => SignupVerification(
                                      email: email,
                                    ));
                                // if (_formKey.currentState!.validate()) {
                                //   print('Good to go');
                                // }
                              }
                            }, 'Create Account', Colors.green, 24,
                                Colors.white),
                            SizedBox(
                              height: height * 0.05,
                            ),
                            Center(
                              child: loginOrsignin(
                                "Already have an account? ",
                                "Login",
                                () {
                                  Get.to(() => const SignIn());
                                },
                              ),
                            )
                          ],
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
