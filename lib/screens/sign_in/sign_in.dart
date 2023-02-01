import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:green_life/screens/sign_in/textform.dart';
import 'package:green_life/widgets/button.dart';

class SignIn extends StatefulWidget {
  const SignIn({super.key});

  @override
  State<SignIn> createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  bool obscurePassword = false;
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Scaffold(
      body: SafeArea(
          child: Padding(
        padding: EdgeInsets.symmetric(
            horizontal: width * 0.09, vertical: height * 0.03),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: EdgeInsets.only(right: width),
                child: IconButton(
                    onPressed: () {},
                    icon: const Icon(
                      Icons.arrow_back_ios,
                      color: Colors.black,
                    )),
              ),
              SizedBox(
                height: height * 0.034,
              ),
              const Center(
                  child: Text(
                'Hi, Welcome back!',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
              )),
              SizedBox(
                height: height * 0.061,
              ),
              Form(
                child: Column(
                  children: [
                    textform('Mobile number', TextInputType.number,
                        const SizedBox.shrink(), obscurePassword),
                    SizedBox(
                      height: height * 0.02,
                    ),
                    textform(
                        'Password',
                        TextInputType.text,
                        obscurePassword == false
                            ? IconButton(
                                icon: const Icon(
                                  CupertinoIcons.eye,
                                  color: Color.fromARGB(213, 178, 178, 178),
                                ),
                                onPressed: () {
                                  setState(() {
                                    obscurePassword = !obscurePassword;
                                  });
                                },
                              )
                            : IconButton(
                                icon: const Icon(CupertinoIcons.eye_slash,
                                    color: Color.fromARGB(213, 178, 178, 178)),
                                onPressed: () {
                                  setState(() {
                                    obscurePassword = !obscurePassword;
                                  });
                                },
                              ),
                        obscurePassword),
                    Row(
                      children: [
                        const Expanded(child: SizedBox()),
                        TextButton(
                            onPressed: () {},
                            child: const Text(
                              'Forgotten password?',
                              style: TextStyle(
                                  fontSize: 14,
                                  color: Color.fromARGB(209, 52, 168, 83)),
                            ))
                      ],
                    ),
                    SizedBox(
                      height: height * 0.033,
                    ),
                    button(height, width, () {}, 'Log in'),
                    SizedBox(
                      height: height * 0.069,
                    ),
                    loginOrsignin("Don't have account? ", "Sign up")
                  ],
                ),
              )
            ],
          ),
        ),
      )),
    );
  }
}
