import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:green_life/screens/home_page/approval/widget/client_data.dart';
import 'package:green_life/screens/home_page/referral_page/referral_page.dart';

class ApprovalPage extends StatelessWidget {
  const ApprovalPage({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white12,
          elevation: 0,
          leading: IconButton(
            onPressed: () {
              Get.back();
            },
            icon: const Icon(
              Icons.arrow_back_ios_new,
              color: Colors.black,
              size: 18,
            ),
          ),
        ),
        body: Stack(
          alignment: AlignmentDirectional.center,
          children: [
            Column(
              children: [
                SizedBox(
                  height: height * 0.55,
                ),
                Container(
                  height: height * 0.30,
                  decoration: const BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage('assets/images/vector.png'),
                    ),
                  ),
                ),
              ],
            ),
            SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    SizedBox(
                      height: height * 0.035,
                    ),
                    Material(
                      elevation: 5,
                      color: const Color(0xFFF7F7F7),
                      borderRadius: BorderRadius.circular(12),
                      child: SizedBox(
                        height: height * 0.65,
                        width: width * 0.7,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            SizedBox(height: height * 0.02,),
                            SizedBox(
                              width: width * 0.4,
                              child: const Text(
                                "Loan Application",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 24,
                                  color: Colors.green,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            SizedBox(
                              height: height * 0.02,
                            ),
                            SizedBox(
                              width: width * 0.5,
                              child: const Text(
                                "Hello, Client Manager’s Name",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 12.5,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            SizedBox(
                              height: height * 0.02,
                            ),
                            SizedBox(
                              width: width * 0.5,
                              child: const Text(
                                "Thank you for choosing us and doing business with us, Here is the Summary of your Loan Application",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 11,
                                ),
                              ),
                            ),
                            SizedBox(
                              height: height * 0.02,
                            ),
                            SizedBox(
                                height: height * 0.2,
                                width: width * 0.52,
                                child: ListView.builder(
                                    itemCount: data.length,
                                    itemBuilder: (context, index) {
                                      return ClientData(
                                        data[index]
                                      );
                                    }),),
                                SizedBox(
                              height: height * 0.02,
                            ),
                              ElevatedButton(
                              onPressed: () {
                                Get.to(const ReferralPage());
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.green,
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 4),
                                minimumSize: const Size(40, 20),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(20),
                                  side: const BorderSide(color: Colors.green),
                                ),
                                elevation: 5,
                                shadowColor: Colors.green,
                              ),
                              child: const Text(
                                ' Approve',
                                style: TextStyle(fontSize: 13, fontWeight: FontWeight.w400),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
