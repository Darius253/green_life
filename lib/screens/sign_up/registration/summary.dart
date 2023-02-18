import 'package:flutter/material.dart';
import 'package:green_life/screens/sign_up/registration/widgets/loan_summary.dart';

import '../../../widgets/button.dart';

class Summary extends StatelessWidget {
  const Summary({super.key});

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Scaffold(
        body: SafeArea(
      child: Padding(
        padding: EdgeInsets.symmetric(
            horizontal: width * 0.05, vertical: height * 0.03),
        child: Stack(
          children: [
            backButton(Colors.black),
            SingleChildScrollView(
              child: Center(
                child: Padding(
                  padding: EdgeInsets.symmetric(vertical: height * 0.09),
                  child: Card(
                    color: const Color.fromARGB(240, 247, 247, 247),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16)),
                    shadowColor: const Color.fromARGB(210, 104, 101, 101),
                    elevation: 20.0,
                    borderOnForeground: false,
                    child: Container(
                      height: height * 0.7,
                      width: width * 0.85,
                      decoration:
                          BoxDecoration(borderRadius: BorderRadius.circular(5)),
                      child: Padding(
                        padding: EdgeInsets.symmetric(horizontal: width * 0.1),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            const Text(
                              'Application\n Summary',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                  height: 1.5,
                                  fontSize: 26,
                                  fontWeight: FontWeight.bold,
                                  color: Color.fromARGB(255, 52, 168, 83)),
                            ),
                            SizedBox(
                              height: height * 0.02,
                            ),
                            const Text(
                              'Hello, Darius',
                              style: TextStyle(fontWeight: FontWeight.w500),
                            ),
                            SizedBox(
                              height: height * 0.025,
                            ),
                            const Text(
                              'Thank you for choosing us and doing business with us, Here is the Summary of your Loan Application',
                              textAlign: TextAlign.center,
                              style: TextStyle(fontWeight: FontWeight.w500),
                            ),
                            SizedBox(
                              height: height * 0.05,
                            ),
                            loanSummary('Loan Amount:', 'Hello', width,
                                Colors.black, width * 0.1),
                            loanSummary('Recipient Account:', 'Hello', width,
                                Colors.black, width*0.01),
                            loanSummary(
                                'Terms:', 'Hello', width, Colors.black, width*0.23),
                            loanSummary('Amount to be Paid:', 'Hello', width,
                                Colors.black, width*0.01),
                            loanSummary('Payment Schedule:', 'Hello', width,
                                Colors.black, width*0.01),
                            loanSummary(
                                'Deadline:', 'Hello', width, Colors.black, width*0.195),
                            SizedBox(
                              height: height * 0.06,
                            ),
                            GestureDetector(
                              onTap: () => showSuccess(context),
                              child: Center(
                                child: Container(
                                  width: width * 0.25,
                                  height: height * 0.05,
                                  decoration: BoxDecoration(
                                      color: const Color.fromARGB(
                                          237, 52, 168, 83),
                                      boxShadow: const [
                                        BoxShadow(
                                            color: Color.fromARGB(
                                                228, 52, 168, 83),
                                            spreadRadius: 5,
                                            blurRadius: 10),
                                      ],
                                      borderRadius: BorderRadius.circular(40)),
                                  child: const Center(
                                      child: Text(
                                    'Submit',
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
                      ),
                    ),
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    ));
  }

  showSuccess(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        elevation: 5.0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(51)),
        icon: const Image(
            height: 150, image: AssetImage('assets/images/success.jpg')),
        title: Center(
          child: Text(
            'Congratulations!',
            style: Theme.of(context).textTheme.titleLarge!.copyWith(
                fontWeight: FontWeight.bold,
                fontSize: 24,
                color: const Color.fromARGB(255, 52, 168, 83)),
          ),
        ),
        content: const Text(
          'Your Loan Application\nHas been submitted Successfully.\n   \nYou will receive a notification for confirmation shortly.\n   \nThank you.',
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
