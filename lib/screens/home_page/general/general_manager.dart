import 'package:flutter/material.dart';
import 'package:green_life/screens/home_page/approval/review/review_page.dart';
import 'package:green_life/screens/home_page/general/widget/list_view_gmanager.dart';
import 'package:green_life/screens/home_page/widgets/drawer_widget.dart';
import 'package:green_life/shared/exports.dart';

class GeneralManager extends StatelessWidget {
  const GeneralManager({super.key});

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return Scaffold(
      drawer: const DrawerWidget(),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Stack(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const TopBar(
                    position: 'Gen. Manager’s Name',
                  ),
                  SizedBox(height: height * 0.20, child: const ListViewGeneralManager()),
                  const SizedBox(
                    height: 8,
                  ),
                  Align(
                    alignment: Alignment.center,
                    child: SizedBox(
                      height: height * 0.135,
                      width: width * 0.9,
                      child: ListView.builder(
                        itemCount: hdata.length,
                        scrollDirection: Axis.horizontal,
                        itemBuilder: (context, index) {
                          return IconWidget(
                            onTap: () {},
                            idatas: idata[index],
                          );
                        },
                      ),
                    ),
                  ),
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Text(
                      'Clients',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment.center,
                    child: SizedBox(
                      height: height * 0.40,
                      width: width * 0.85,
                      child: ListView.builder(
                        itemCount: hdata.length,
                        itemBuilder: (context, index) {
                          return HistoryCard(
                            hdatas: hdata[index],
                            onTap: () {
                              Get.to(const ReviewPage());
                            },
                          );
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
