import 'package:flutter/material.dart';

import '../../../widgets/button.dart';

class Summary extends StatelessWidget {
  const Summary({super.key});

  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Placeholder(
        child: Stack(
      children: [
        backButton(),
        Center(
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
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      height: height * 0.01,
                    ),
                    Container(
                      height: height * 0.15,
                      width: width * 0.6,
                      padding: EdgeInsets.symmetric(
                          horizontal: width * 0.1, vertical: height * 0.01),
                      decoration: BoxDecoration(
                          color: const Color.fromARGB(230, 214, 247, 222),
                          borderRadius: BorderRadius.circular(20)),
                      child: const Text(
                        'Application Summary',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            height: 1.5,
                            fontSize: 24,
                            fontWeight: FontWeight.w700,
                            color: Color.fromARGB(255, 52, 168, 83)),
                      ),
                    ),
                    SizedBox(
                      height: height * 0.05,
                    ),
                    const Text(
                      'Hello, Darius',
                      style: TextStyle(fontWeight: FontWeight.w500),
                    ),
                    const Text(
                      'Thank you for choosing us and doing business with us, Here is the Summary of your Loan Application',
                      style: TextStyle(fontWeight: FontWeight.w500),
                    ),
                  ],
                ),
              ),
            ),
          ),
        )
      ],
    ));
  }
}
