import 'package:flutter/material.dart';
import 'package:green_life/shared/exports.dart';

class AddGuarantor extends StatefulWidget {
  const AddGuarantor({super.key});

  @override
  State<AddGuarantor> createState() => _AddGuarantorState();
}

class _AddGuarantorState extends State<AddGuarantor> {
  bool obscurePassword = false;
  final TextEditingController _fullName1 = TextEditingController();
  final TextEditingController _phoneNumber1 = TextEditingController();
  final TextEditingController _fullName2 = TextEditingController();
  final TextEditingController _phoneNumber2 = TextEditingController();
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
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    height: height * 0.034,
                  ),
                  Center(
                    child: Column(
                      children: const [
                        Text(
                          "Guarantors’ Details",
                          style: TextStyle(
                              fontSize: 24, fontWeight: FontWeight.w600),
                        ),
                        Text(
                          "Forms will be sent to Guarantors to fill",
                          style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w400,
                              color: Color.fromARGB(213, 178, 178, 178)),
                        ),
                      ],
                    ),
                  ),
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
                          const Center(
                              child: Text(
                            'First Guarantor',
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 18,
                                fontWeight: FontWeight.w500),
                          )),
                          SizedBox(
                            height: height * 0.01,
                          ),
                          textform(
                            'Full Name on Ghana Card',
                            height,
                            width,
                            TextInputType.number,
                            _fullName1,
                            (value) {},
                          ),
                          SizedBox(
                            height: height * 0.02,
                          ),

                          //PhoneNumber
                          textform(
                            'Mobile Number',
                            height,
                            width,
                            TextInputType.number,
                            _phoneNumber1,
                            (value) {},
                          ),
                          SizedBox(
                            height: height * 0.07,
                          ),
                          const Center(
                              child: Text(
                            'Second Guarantor',
                            style: TextStyle(
                                color: Colors.black,
                                fontSize: 18,
                                fontWeight: FontWeight.w500),
                          )),
                          SizedBox(
                            height: height * 0.01,
                          ),
                          textform(
                            'Full Name on Ghana Card',
                            height,
                            width,
                            TextInputType.number,
                            _fullName1,
                            (value) {},
                          ),
                          SizedBox(
                            height: height * 0.02,
                          ),
                          textform(
                            'Mobile Number',
                            height,
                            width,
                            TextInputType.number,
                            _phoneNumber2,
                            (value) {},
                          ),
                          SizedBox(
                            height: height * 0.02,
                          ),
                          SizedBox(
                            height: height * 0.033,
                          ),
                          button(height * 0.08, width, () {
                            if (_formKey.currentState!.validate()) {}
                          }, 'Submit', Colors.green, Colors.white),
                          SizedBox(
                            height: height * 0.054,
                          ),
                        ],
                      ),
                    ),
                  )
                ],
              ),
            ],
          ),
        ),
      )),
    );
  }
}
