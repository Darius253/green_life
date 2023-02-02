import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:green_life/screens/sign_in/sign_in.dart';
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
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                backButton(),
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
                          TextInputType.name,
                          _nameController,
                          (value) {},
                        ),
                        SizedBox(
                          height: height * 0.02,
                        ),
                        textform(
                          'Mobile number',
                          TextInputType.number,
                          _mobileNumberController,
                          (value) {},
                        ),
                        SizedBox(
                          height: height * 0.02,
                        ),
                        textform(
                          'Email',
                          TextInputType.emailAddress,
                          _emailController,
                          (value) {},
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
                          autovalidateMode: AutovalidateMode.onUserInteraction,
                          decoration: InputDecoration(
                              hintText: 'Password',
                              suffixIcon: obscurePassword == true
                                  ? IconButton(
                                      icon: const Icon(
                                        CupertinoIcons.eye_slash,
                                        color:
                                            Color.fromARGB(213, 178, 178, 178),
                                      ),
                                      onPressed: () {
                                        setState(() {
                                          obscurePassword = !obscurePassword;
                                        });
                                      },
                                    )
                                  : IconButton(
                                      icon: const Icon(CupertinoIcons.eye,
                                          color: Color.fromARGB(
                                              213, 178, 178, 178)),
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
                        SizedBox(
                          height: height * 0.058,
                        ),
                        button(height, width, () {
                          if (_formKey.currentState!.validate()) {
                            print('Good to go');
                          }
                        }, 'Create Account'),
                        SizedBox(
                          height: height * 0.030,
                        ),
                        Center(
                          child: loginOrsignin(
                            "Already have an account? ",
                            "Login",
                            () => Get.to(() => const SignIn()),
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
    );
  }
}
