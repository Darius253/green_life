import 'package:flutter/material.dart';
import 'package:green_life/screens/home_page/widgets/green_button.dart';

class ListViewClientManager extends StatefulWidget {
  const ListViewClientManager({super.key});

  @override
  State<ListViewClientManager> createState() => _ListViewClientManagerState();
}

class _ListViewClientManagerState extends State<ListViewClientManager> {
  int _selectedIndex = -1;
  final List<String> _items = List.generate(5, (index) => 'Item $index');

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: _items.length,
      itemBuilder: (context, index) {
        return GestureDetector(
          onTap: () {
            setState(() {
              _selectedIndex = index;
            });
          },
          child: Padding(
            padding: const EdgeInsets.all(5.0),
            child: Container(
                height: MediaQuery.of(context).size.height * 0.025,
                width: MediaQuery.of(context).size.width * 0.7,
                decoration: BoxDecoration(
                  gradient: _selectedIndex == index
                      ? const LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            Color(0xFF34A853),
                            Color(0xFF007F5F),
                          ],
                          stops: [0.4427, 0.8177],
                        )
                      : const LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                            Color.fromARGB(255, 197, 197, 197),
                            Color.fromARGB(255, 109, 109, 109),
                          ],
                          stops: [0.4427, 0.8177],
                        ),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: const GreenButton(
                  btext: 'Register Client',
                )),
          ),
        );
      },
    );
  }
}
