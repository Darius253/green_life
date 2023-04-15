import 'package:flutter/material.dart';
import 'package:green_life/screens/home_page/approval/approval_page.dart';
import 'package:green_life/shared/exports.dart';

class ReviewCard extends StatelessWidget {
  const ReviewCard({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    //final double width = MediaQuery.of(context).size.width;
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          const CircleAvatar(
            backgroundColor: Color.fromARGB(255, 201, 199, 199),
            radius: 20,
          ),
          const SizedBox(
            width: 10,
          ),
          Container(
            height: height * 0.12,
            decoration: BoxDecoration(
                color: const Color.fromARGB(255, 239, 252, 249),
                borderRadius: BorderRadius.circular(10)),
            child: Padding(
              padding: const EdgeInsets.all(6),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Kindly approve the amount of ......................',
                    style: TextStyle(
                        fontSize: 12,
                        color: Colors.black,
                        fontWeight: FontWeight.w400),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      Get.to(const ApprovalPage());
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(
                          horizontal: 6, vertical: 1),
                      minimumSize: const Size(35, 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                        side: const BorderSide(color: Colors.green),
                      ),
                      elevation: 2,
                      shadowColor: Colors.green,
                    ),
                    child: const Text(
                      'Review',
                      style: TextStyle(fontSize: 11, color: Colors.green),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
