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
          title: 'Marital Status',
          firstOption: 'Single',
          secondOption: 'Married',
          thirdOption: 'Divorced',
          fourthOption: "Widow / Widower",
          onTap: () {
            Get.to(const UploadPicture());
          }),
      const UploadPicture()
    ];
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Scaffold(
        body: SafeArea(
            child: Padding(
      padding: EdgeInsets.symmetric(
          horizontal: width * 0.05, vertical: height * 0.03),
      child: SingleChildScrollView(
        child: Stack(
          children: [
            Row(
              children: [
                backButton(),
                SizedBox(
                  width: width * 0.25,
                ),
                Text(
                  'STEP ${pageIndex + 1}/${pages.length}',
                  style: const TextStyle(
                      fontWeight: FontWeight.w500, fontSize: 15),
                )
              ],
            ),
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
                          height: height * 0.15,
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
                            'Ads or some relevant information about the application can be displayed here',
                            textAlign: TextAlign.center,
                            style: TextStyle(height: 1.5),
                          ),
                        ),
                        SizedBox(
                          height: height * 0.05,
                        ),
                        Expanded(
                          child: Padding(
                            padding: EdgeInsets.only(
                                left: width * 0.15, right: width * 0.1),
                            child: PageView(
                              physics: const NeverScrollableScrollPhysics(),
                              controller: pageController,
                              children: pages,
                              onPageChanged: (index) {
                                setState(() {
                                  pageIndex = index;
                                });
                              },
                            ),
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    )));
  }
}
