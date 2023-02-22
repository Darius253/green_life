import 'package:flutter/material.dart';
import 'package:green_life/screens/home_page/widgets/history_card.dart';
import 'package:green_life/screens/home_page/widgets/list_view.dart';
import 'package:green_life/screens/home_page/widgets/top_bar.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Stack(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const TopBar(position: 'Gen. Manager’s Name',),
                  const SizedBox(
                    height: 3,
                  ),
                  SizedBox(
                    height: height * 0.19,
                    child: const MyListView()
                  ),
                  const SizedBox(
                    height: 6,
                  ),
                  const Padding(
                    padding: EdgeInsets.all(8.0),
                    child: Text(
                      'My Orders',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 3,
                  ),
                  Flexible(
                    child: Align(
                      alignment: Alignment.center,
                      child: SizedBox(
                        height: height * 0.43,
                        width: width * 0.85,
                        child: ListView.builder(
                          itemCount: hdata.length,
                          itemBuilder: (context, index){
                           return HistoryCard(hdatas: null,);
                        },
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}