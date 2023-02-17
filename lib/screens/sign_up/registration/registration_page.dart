import 'package:flutter/material.dart';
import 'package:green_life/screens/sign_up/registration/widgets/picture_upload.dart';
import 'package:green_life/screens/sign_up/registration/widgets/textbox.dart';
import 'package:green_life/shared/exports.dart';

class RegistrationPage extends StatefulWidget {
  const RegistrationPage({super.key});

  @override
  State<RegistrationPage> createState() => _RegistrationPageState();
}

class _RegistrationPageState extends State<RegistrationPage> {
  int pageIndex = 0;
  final pageController = PageController();
  final controller = TextEditingController();
  final formKey = GlobalKey<FormState>();
  String? name = '';
  String? age = '';
  String? location = '';
  String? years = '';
  String? occupation = '';
  String? dependants = '';
  String? income = '';
  String? amount = '';
  String? accountNumber = '';
  double _currentSliderValue = 20;

  @override
  Widget build(BuildContext context) {
    List<Widget> pages = [
      RegistrationTextField(
        formkey: formKey,
        keyboardType: TextInputType.emailAddress,
        hintText: 'Name',
        onChanged: (value) {
          setState(() {
            name = value;
          });
        },
        onSaved: (value) {
          setState(() {
            name = value;
          });
        },
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please enter your email';
          }
          return null;
        },
        onTap: () {
          if (formKey.currentState!.validate()) {
            print(name);
            pageController.animateToPage(pageIndex + 1,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeIn);
          }
        },
        title: 'Enter Your Full Name',
        controller: controller,
        index: pageIndex,
        subtitle: 'Just as it appears on your Ghana Card',
      ),
      Buttons(
          title: 'Gender',
          firstOption: 'Male',
          secondOption: 'Female',
          thirdOption: "",
          fourthOption: "",
          onTap: () {
            // Get.to(const UploadPicture());
          }),
      RegistrationTextField(
        formkey: formKey,
        keyboardType: TextInputType.number,
        hintText: 'Enter your age',
        onChanged: (value) {
          setState(() {
            age = value;
          });
        },
        onSaved: (value) {
          setState(() {
            age = value;
          });
        },
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please enter your age';
          }
          return null;
        },
        onTap: () {
          if (formKey.currentState!.validate()) {
            print(age);
            pageController.animateToPage(pageIndex + 1,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeIn);
          }
        },
        title: 'Enter Your Age',
        controller: controller,
        index: pageIndex,
        subtitle: '',
      ),
      Buttons(
          title: 'Marital Status',
          firstOption: 'Single',
          secondOption: 'Married',
          thirdOption: 'Divorced',
          fourthOption: "Widow / Widower",
          onTap: () {
            // Get.to(const UploadPicture());
          }),
      Buttons(
          title: 'Residential Status',
          firstOption: 'Own',
          secondOption: 'Rented',
          thirdOption: 'Family House',
          fourthOption: "Others",
          onTap: () {
            // Get.to(const UploadPicture());
          }),
      RegistrationTextField(
        formkey: formKey,
        keyboardType: TextInputType.number,
        hintText: 'Enter your Address / Location',
        onChanged: (value) {
          setState(() {
            location = value;
          });
        },
        onSaved: (value) {
          setState(() {
            location = value;
          });
        },
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please enter your address';
          }
          return null;
        },
        onTap: () {
          if (formKey.currentState!.validate()) {
            print(location);
            pageController.animateToPage(pageIndex + 1,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeIn);
          }
        },
        title: 'Residential Address / Location',
        controller: controller,
        index: pageIndex,
        subtitle: '',
      ),
      RegistrationTextField(
        formkey: formKey,
        keyboardType: TextInputType.number,
        hintText: 'How long have you stayed there?',
        onChanged: (value) {
          setState(() {
            location = value;
          });
        },
        onSaved: (value) {
          setState(() {
            location = value;
          });
        },
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Please provide the years';
          }
          return null;
        },
        onTap: () {
          if (formKey.currentState!.validate()) {
            print(location);
            pageController.animateToPage(pageIndex + 1,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeIn);
          }
        },
        title: 'Number of years at Residence',
        controller: controller,
        index: pageIndex,
        subtitle: '',
      ),
      Buttons(
          title: 'What is your highest level of Education?',
          firstOption: 'JHS',
          secondOption: 'SHS',
          thirdOption: 'Tertiary',
          fourthOption: "Others",
          onTap: () {
            // Get.to(const UploadPicture());
          }),
      Buttons(
          title: 'Employment',
          firstOption: 'Self-Employed',
          secondOption: 'Employed',
          thirdOption: 'Unemployed',
          fourthOption: "",
          onTap: () {
            // Get.to(const UploadPicture());
          }),
      RegistrationTextField(
        formkey: formKey,
        keyboardType: TextInputType.text,
        hintText: 'Type the work that you do here',
        onChanged: (value) {
          setState(() {
            occupation = value;
          });
        },
        onSaved: (value) {
          setState(() {
            occupation = value;
          });
        },
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'This Field cannot be empty';
          }
          return null;
        },
        onTap: () {
          if (formKey.currentState!.validate()) {
            print(occupation);
            pageController.animateToPage(pageIndex + 1,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeIn);
          }
        },
        title: 'What is your occupation?',
        controller: controller,
        index: pageIndex,
        subtitle: '',
      ),
      RegistrationTextField(
        formkey: formKey,
        keyboardType: TextInputType.number,
        hintText: 'Enter the number here',
        onChanged: (value) {
          setState(() {
            dependants = value;
          });
        },
        onSaved: (value) {
          setState(() {
            dependants = value;
          });
        },
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'This Field cannot be empty';
          }
          return null;
        },
        onTap: () {
          if (formKey.currentState!.validate()) {
            print(dependants);
            pageController.animateToPage(pageIndex + 1,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeIn);
          }
        },
        title: 'How many people depend on you?',
        controller: controller,
        index: pageIndex,
        subtitle: '',
      ),
      RegistrationTextField(
        formkey: formKey,
        keyboardType: TextInputType.number,
        hintText: 'Enter the amount here',
        onChanged: (value) {
          setState(() {
            income = value;
          });
        },
        onSaved: (value) {
          setState(() {
            income = value;
          });
        },
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'This Field cannot be empty';
          }
          return null;
        },
        onTap: () {
          if (formKey.currentState!.validate()) {
            print(income);
            pageController.animateToPage(pageIndex + 1,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeIn);
          }
        },
        title: 'What is your monthly income?',
        controller: controller,
        index: pageIndex,
        subtitle: '',
      ),
      Buttons(
          title: 'How do you handle your monthly surplus?',
          firstOption: 'Invest',
          secondOption: 'Spend',
          thirdOption: 'None',
          fourthOption: "",
          onTap: () {
            // Get.to(const UploadPicture());
          }),
      Buttons(
          title: 'Have you taken a loan before?',
          firstOption: 'Yes, I have',
          secondOption: "No, I haven't",
          thirdOption: "",
          fourthOption: "",
          onTap: () {
            // Get.to(const UploadPicture());
          }),
      Buttons(
          title: 'What was the source of the loan?',
          firstOption: 'Bank',
          secondOption: "Savings and Loan",
          thirdOption: "Friends and Family",
          fourthOption: "",
          onTap: () {
            // Get.to(const UploadPicture());
          }),
      Buttons(
          title: '''Did you default?
What made you default?''',
          firstOption: 'Interest rate',
          secondOption: "Payment Schedule/Duration",
          thirdOption: "Friends and family",
          fourthOption: "",
          onTap: () {
            // Get.to(const UploadPicture());
          }),
      RegistrationTextField(
        formkey: formKey,
        keyboardType: TextInputType.text,
        hintText: 'Enter the loan amount here',
        onChanged: (value) {
          setState(() {
            amount = value;
          });
        },
        onSaved: (value) {
          setState(() {
            amount = value;
          });
        },
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'This Field cannot be empty';
          }
          return null;
        },
        onTap: () {
          if (formKey.currentState!.validate()) {
            print(amount);
            pageController.animateToPage(pageIndex + 1,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeIn);
          }
        },
        title: 'How much money do you want to take as loan?',
        controller: controller,
        index: pageIndex,
        subtitle: '',
      ),
      Buttons(
          title: 'How do you want to receive the loan?',
          firstOption: 'Bank',
          secondOption: "Mobile Money",
          thirdOption: "Cash",
          fourthOption: "",
          onTap: () {
            // Get.to(const UploadPicture());
          }),
      RegistrationTextField(
        formkey: formKey,
        keyboardType: TextInputType.text,
        hintText: 'Enter the account number here',
        onChanged: (value) {
          setState(() {
            accountNumber = value;
          });
        },
        onSaved: (value) {
          setState(() {
            accountNumber = value;
          });
        },
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'This Field cannot be empty';
          }
          return null;
        },
        onTap: () {
          if (formKey.currentState!.validate()) {
            print(accountNumber);
            pageController.animateToPage(pageIndex + 1,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeIn);
          }
        },
        title: 'Enter your Bank/Momo Account',
        controller: controller,
        index: pageIndex,
        subtitle: '',
      ),
    ];
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    // return pageIndex !=5
    return Scaffold(
        body: SafeArea(
            child: Container(
      height: height,
      decoration: const BoxDecoration(
          gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
            Color.fromARGB(255, 0, 127, 95),
            Color.fromARGB(255, 52, 168, 83)
          ])),
      child: Padding(
        padding: EdgeInsets.symmetric(
            horizontal: width * 0.05, vertical: height * 0.03),
        child: SingleChildScrollView(
          child:
              //pageIndex != 20
              //     ? Stack(
              //         children: [
              //           Row(
              //             children: [
              //               backButton(),
              //               SizedBox(
              //                 width: width * 0.25,
              //               ),
              //               Text(
              //                 'STEP ${pageIndex + 1}/${pages.length}',
              //                 style: const TextStyle(
              //                     fontWeight: FontWeight.w500, fontSize: 15),
              //               )
              //             ],
              //           ),
              //           Center(
              //             child: Padding(
              //               padding: EdgeInsets.symmetric(vertical: height * 0.09),
              //               child: Card(
              //                 color: const Color.fromARGB(240, 247, 247, 247),
              //                 shape: RoundedRectangleBorder(
              //                     borderRadius: BorderRadius.circular(16)),
              //                 shadowColor: const Color.fromARGB(210, 104, 101, 101),
              //                 elevation: 20.0,
              //                 borderOnForeground: false,
              //                 child: Container(
              //                   height: height * 0.7,
              //                   width: width * 0.85,
              //                   decoration: BoxDecoration(
              //                       borderRadius: BorderRadius.circular(5)),
              //                   child: Column(
              //                     mainAxisAlignment: MainAxisAlignment.center,
              //                     children: [
              //                       SizedBox(
              //                         height: height * 0.15,
              //                       ),
              //                       Container(
              //                         height: height * 0.15,
              //                         width: width * 0.6,
              //                         padding: EdgeInsets.symmetric(
              //                             horizontal: width * 0.1,
              //                             vertical: height * 0.01),
              //                         decoration: BoxDecoration(
              //                             color: const Color.fromARGB(
              //                                 230, 214, 247, 222),
              //                             borderRadius: BorderRadius.circular(20)),
              //                         child: const Text(
              //                           'Ads or some relevant information about the application can be displayed here',
              //                           textAlign: TextAlign.center,
              //                           style: TextStyle(height: 1.5),
              //                         ),
              //                       ),
              //                       SizedBox(
              //                         height: height * 0.05,
              //                       ),
              //                       Expanded(
              //                         child: Padding(
              //                           padding: EdgeInsets.only(
              //                               left: width * 0.15, right: width * 0.1),
              //                           child: PageView(
              //                             controller: pageController,
              //                             children: pages,
              //                             onPageChanged: (index) {
              //                               setState(() {
              //                                 pageIndex = index;
              //                               });
              //                             },
              //                           ),
              //                         ),
              //                       )
              //                     ],
              //                   ),
              //                 ),
              //               ),
              //             ),
              //           )
              //         ],
              //       )
              // :
              Column(
            children: [
              Text(
                'STEP ${pageIndex + 1}/${pages.length}',
                style: const TextStyle(
                    fontWeight: FontWeight.w500,
                    fontSize: 15,
                    color: Colors.white),
              ),
              SizedBox(
                height: height * 0.03,
              ),
              Row(children: [
                backButton(),
                Padding(
                  padding: EdgeInsets.only(left: width * 0.1),
                  child: const Text(
                    'Fill the following options\n to choose how much\n you want to borrow and\n for how long?',
                    style: TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 15,
                        color: Colors.white),
                    textAlign: TextAlign.center,
                  ),
                ),
              ]),
              SizedBox(
                height: height * 0.05,
              ),
              Slider.adaptive(
                value: 1000,
                max: 6000,
                divisions: 100,
                label: _currentSliderValue.round().toString(),
                onChanged: (double value) {
                  setState(() {
                    _currentSliderValue = value;
                  });
                },
              ),
              SizedBox(
                height: height * 0.1,
              ),
              Slider.adaptive(
                value: 1,
                max: 12,
                divisions: 12,
                label: _currentSliderValue.round().toString(),
                onChanged: (double value) {
                  setState(() {
                    _currentSliderValue = value;
                  });
                },
              ),
              SizedBox(
                height: height * 0.04,
              ),
              Container(
                width: width,
                height: height * 0.3,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: const Color.fromARGB(255, 3, 85, 64)),
                child: Padding(
                  padding: EdgeInsets.symmetric(
                      vertical: height * 0.03, horizontal: width * 0.1),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children:  [
                      const Text(
                        'Loan Amount',
                        style: TextStyle(
                            fontSize: 14,
                            height: 2,
                            color: Colors.white,
                            fontWeight: FontWeight.w500),
                      ),
                     const  Text(
                        'Interest',
                        style: TextStyle(
                            fontSize: 14,
                            height: 2,
                            color: Colors.white,
                            fontWeight: FontWeight.w500),
                      ),
                     const  Text(
                        'Pay/month',
                        style: TextStyle(
                            fontSize: 14,
                            height: 2,
                            color: Colors.white,
                            fontWeight: FontWeight.w500),
                      ),
                      const Text(
                        'Interest',
                        style: TextStyle(
                            fontSize: 14,
                            height: 2,
                            color: Colors.white,
                            fontWeight: FontWeight.w500),
                      ),
                      const Text(
                        'Deadline',
                        style: TextStyle(
                            fontSize: 14,
                            height: 2,
                            color: Colors.white,
                            fontWeight: FontWeight.w500),
                      ),
                      SizedBox(height: height * 0.03),
                      const Text(
                        'Total Amount',
                        style: TextStyle(
                            fontSize: 14,
                            height: 2,
                            color: Colors.white,
                            fontWeight: FontWeight.w500),
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(
                height: height * 0.02,
              ),
              Container(
                  width: width,
                  height: height * 0.07,
                  decoration: const BoxDecoration(
                      color: Color.fromARGB(255, 255, 217, 2)),
                  child: const Center(child: Text('Apply Now'))),
            ],
          ),
        ),
      ),
    )));
  }
}