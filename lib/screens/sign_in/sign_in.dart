import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../shared/exports.dart';

class SignIn extends StatefulWidget {
  const SignIn({super.key});

  @override
  State<SignIn> createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  bool obscurePassword = false;
  final TextEditingController _mobileNumberController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;

    return Scaffold(
      body: SafeArea(
          child: Padding(
        padding: EdgeInsets.symmetric(
            horizontal: width * 0.02, vertical: height * 0.03),
        child: SingleChildScrollView(
          child: Stack(
            children:[ Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                backButton(Colors.black),
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
                  key: _formKey,
                  child: Padding(
                    padding: EdgeInsets.symmetric(
                      horizontal: width * 0.09,
                    ),
                    child: Column(
                      children: [
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
          
                        //Password field
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
                          autovalidateMode: AutovalidateMode.onUserInteraction,
                          decoration: InputDecoration(
                              contentPadding: EdgeInsets.symmetric(
                                  horizontal: width * 0.09,
                                  vertical: height * 0.025),
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
                        button(height, width, () {
                          if (_formKey.currentState!.validate()) {}
                        }, 'Log in'),
                        SizedBox(
                          height: height * 0.054,
                        ),
                        loginOrsignin(
                          "Don't have account? ",
                          "Sign up",
                          () => Get.to(() => const SignUp()),
                        )
                      ],
                    ),
                  ),
                )
              ],
            ),
            Padding(padding: EdgeInsets.only(top: height*0.7),
            child: Image.asset('assets/images/Vector.png'),)
            ],
          ),
        ),
      )),
    );
  }
}
