import 'package:flutter/material.dart';
import 'package:green_life/model/drawer_model.dart';

import '../../../shared/exports.dart';

class DrawerWidget extends StatelessWidget {
  const DrawerWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return Drawer(
      width: width,
      child: Material(
        color: Colors.white70,
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: SingleChildScrollView(
            child: Column(
              children: [
                SizedBox(
                  height: height * 0.001,
                ),
                topWidget(context),
                 SizedBox(
                  height: height * 0.01,
                ),
                const Divider(
                  thickness: 1,
                  height: 10,
                  color: Colors.green,
                ),
                SizedBox(
                  height: height * 0.008,
                ),
                Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: Column(
                    children: [
                      DrawerModel(
                        name: 'Home',
                        icon: Icons.home_filled,
                        onPressed: () {
                          Get.to(const GeneralManager());
                        },
                      ),
                      SizedBox(
                        height: height * 0.008,
                      ),
                      DrawerModel(
                        name: 'Make Payment',
                        icon: Icons.payment_outlined,
                        onPressed: () {},
                      ),
                      SizedBox(
                        height: height * 0.008,
                      ),
                      DrawerModel(
                        name: 'Feedback',
                        icon: Icons.feedback_sharp,
                        onPressed: () {},
                      ),
                      SizedBox(
                        height: height * 0.008,
                      ),
                      DrawerModel(
                        name: 'Contact',
                        icon: Icons.phone_enabled_outlined,
                        onPressed: () {},
                      ),
                      SizedBox(
                        height: height * 0.008,
                      ),
                      DrawerModel(
                        name: 'FAQ',
                        icon: Icons.question_answer_outlined,
                        onPressed: () {},
                      ),
                      SizedBox(
                        height: height * 0.008,
                      ),
                      DrawerModel(
                        name: 'Referrals',
                        icon: Icons.join_full,
                        onPressed: () {},
                      ),
                      SizedBox(
                        height: height * 0.008,
                      ),
                      DrawerModel(
                        name: 'About',
                        icon: Icons.info_outline,
                        onPressed: () {},
                      ),
                      SizedBox(
                        height: height * 0.008,
                      ),
                      DrawerModel(
                        name: 'Terms & Condition',
                        icon: Icons.local_activity,
                        onPressed: () {},
                      ),
                      SizedBox(
                        height: height * 0.008,
                      ),
                      DrawerModel(
                        name: 'Log Out',
                        icon: Icons.exit_to_app_outlined,
                        onPressed: () {},
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget topWidget(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(
          width: 160,
          child: Text(
            'Obed Tawiah Narh',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 27,
              color: Colors.black,
              fontWeight: FontWeight.bold
            ),
          ),
        ),
        const SizedBox(
          width: 25,
        ),
        IconButton(icon: const Icon(Icons.close, color: Colors.black, size: 32,), onPressed: () { 
          Scaffold.of(context).closeDrawer();
          },)
      ],
    );
  }
}
