import 'package:flutter/material.dart';
import 'package:green_life/shared/exports.dart';

class LoanType extends StatefulWidget {
  const LoanType({super.key});

  @override
  State<LoanType> createState() => _LoanTypeState();
}

class _LoanTypeState extends State<LoanType> {
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    precacheImage(const AssetImage('assets/images/loan_type.jpg'), context);
  }

  String loanType = "";

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.symmetric(
            horizontal: width * 0.02, vertical: height * 0.03),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              backButton(),
              SizedBox(
                height: height * 0.1,
              ),
              Padding(
                padding: EdgeInsets.symmetric(
                  horizontal: width * 0.1,
                ),
                child: Center(
                  child: Column(
                    children: [
                      const Image(
                          image: AssetImage('assets/images/loan_type.jpg')),
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
                      button(height, width, () {
                        setState(() {
                          loanType = "Personal Loan";
                        });
                        print(loanType);
                      }, 'Personal Loan'),
                      SizedBox(
                        height: height * 0.024,
                      ),
                      button(height, width, () {
                        setState(() {
                          loanType = "SME's Loan";
                        });
                        print(loanType);
                      }, "SME's Loan")
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
