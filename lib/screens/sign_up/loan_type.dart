import 'package:flutter/material.dart';
import 'package:green_life/screens/sign_up/registration/registration_page.dart';
import 'package:green_life/shared/exports.dart';

class LoanType extends StatefulWidget {
  const LoanType({super.key});

  @override
  State<LoanType> createState() => _LoanTypeState();
}

class _LoanTypeState extends State<LoanType> {
  String loanType = "";

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
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    backButton(Colors.black),
                    SizedBox(
                      height: height * 0.05,
                    ),
                    Padding(
                        padding: EdgeInsets.symmetric(
                          horizontal: width * 0.05,
                        ),
                        child: Center(
                          child: Column(
                            children: [
                              ClipRRect(
                                borderRadius: BorderRadius.circular(36),
                                child: Container(
                                  height: height * 0.25,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(36),
                                    color: Colors.grey,
                                  ),
                                  child: const Image(
                                    image:
                                        AssetImage('assets/images/Pic 4.jpg'),
                                  ),
                                ),
                              ),
                              SizedBox(
                                height: height * 0.061,
                              ),
                              const Text(
                                'TYPE OF LOAN',
                                style: TextStyle(
                                    fontSize: 24, fontWeight: FontWeight.w600),
                              ),
                              SizedBox(
                                height: height * 0.01,
                              ),
                              const Text(
                                "Select the type of Loan you want",
                                style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w400,
                                    color: Color.fromARGB(213, 178, 178, 178)),
                              ),
                              SizedBox(
                                height: height * 0.035,
                              ),
                              button(height*0.08, width, () {
                                Get.to(() => const RegistrationPage());
                                setState(() {
                                  loanType = "Personal Loan";
                                });
                              }, 'Personal Loan', Colors.green, Colors.white),
                              SizedBox(
                                height: height * 0.024,
                              ),
                              button(height*0.08, width, () {
                                setState(() {
                                  loanType = "SME's Loan";
                                });
                              }, "SME's Loan", Colors.green, Colors.white)
                            ],
                          ),
                        )),
                  ],
                ),
                Padding(
                  padding: EdgeInsets.only(top: height * 0.7),
                  child: Image.asset('assets/images/vector.png'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
