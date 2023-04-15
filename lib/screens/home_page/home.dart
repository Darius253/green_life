import 'package:flutter/material.dart';
import 'package:green_life/shared/exports.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return Stack(
      children: [
        Padding(
          padding: EdgeInsets.only(
            top: height * 0.015,
            left: width * 0.08,
            right: width * 0.04,
          ),
          child: const TopBar(
            position: 'Darius Tron',
          ),
        ),
        Padding(
          padding: EdgeInsets.symmetric(
              vertical: height * 0.075, horizontal: width * 0.04),
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(height: height * 0.20, child: const MyListView()),
                SizedBox(
                  height: height * 0.03,
                ),
                const Text(
                  'Current Loan Details',
                  style: TextStyle(
                    fontWeight: FontWeight.w700,
                    fontSize: 16,
                  ),
                ),
                SizedBox(
                  height: height * 0.01,
                ),
                Center(
                  child: SizedBox(
                    height: height * 0.15,
                    child: ListView.separated(
                      separatorBuilder: (context, index) {
                        return SizedBox(
                          width: width * 0.03,
                        );
                      },
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
                const Text(
                  'Loan History',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Center(
                  child: SizedBox(
                    height: height * 0.35,
                    child: ListView.builder(
                      itemCount: hdata.length,
                      itemBuilder: (context, index) {
                        return HistoryCard(
                          hdatas: hdata[index],
                          onTap: () {},
                        );
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
