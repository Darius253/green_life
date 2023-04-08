import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ReferralPage extends StatelessWidget {
  const ReferralPage({super.key});

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return SafeArea(
      child: Scaffold(
        body: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(
                  children: const [
                    SizedBox(
                      height: 38,
                    ),
                    SizedBox(
                      width: 200,
                      child: Text(
                        'Refer your friends and family to share your digital banking experience',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                            fontSize: 14,
                            color: Colors.black,
                            fontWeight: FontWeight.w400),
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  width: 25,
                ),
                IconButton(
                  icon: const Icon(
                    Icons.close,
                    color: Colors.black,
                    size: 30,
                  ),
                  onPressed: () {
                    Get.back();
                  },
                ),
              ],
            ),
            const Divider(
              thickness: 1,
              height: 10,
              color: Colors.green,
            ),
            SizedBox(
              height: height * 0.12,
            ),
            Container(
              color: const Color(0xFFE7FFED),
              height: height * 0.175,
              width: width * 0.65,
              child: Column(
                children: [
                  const ListTile(
                    visualDensity: VisualDensity(horizontal: -4, vertical: -2),
                    leading: Icon(
                      Icons.check,
                      color: Colors.green,
                      size: 16,
                    ),
                    title: Text(
                      'Let your loved ones experience safe banking anytime, anywhere in the comfort of their home',
                      style: TextStyle(fontSize: 7.5),
                    ),
                  ),
                  const ListTile(
                    visualDensity: VisualDensity(horizontal: -4, vertical: -4),
                    leading: Icon(
                      Icons.check,
                      color: Colors.green,
                      size: 16,
                    ),
                    title: Text(
                      'Access to a new convenient world of banking and services',
                      style: TextStyle(fontSize: 7.5),
                    ),
                  ),
                  InkWell(
                    onTap: () {},
                    child: const Text(
                      'Terms & Conditions Apply',
                      style: TextStyle(
                        color: Colors.green,
                        fontSize: 8,
                      ),
                    ),
                  )
                ],
              ),
            ),
            SizedBox(
              height: height * 0.04,
            ),
            SizedBox(
                width: width * 0.58,
                child: const Text(
                  'Your friends can tell us about your referral by using your referral code to open an account.',
                  style: TextStyle(
                    fontSize: 10.2,
                  ),
                )),
                SizedBox(
              height: height * 0.08,
            ),
            Container(
              width: width * 0.38,
              height: height * 0.08,
              color: const Color.fromRGBO(217, 217, 217, 0.38),
            )
          ],
        ),
      ),
    );
  }
}
