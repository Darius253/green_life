import 'package:flutter/material.dart';

class MyListView extends StatefulWidget {
  const MyListView({super.key});

  @override
  State<MyListView> createState() => _MyListViewState();
}

class _MyListViewState extends State<MyListView> {
  int _selectedIndex = -1;
  final List<String> _items = List.generate(10, (index) => 'Item $index');

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
              height: 180,
              width: 250,
              decoration: BoxDecoration(
                 color: _selectedIndex == index ? Colors.green : Colors.grey,
                 shape: BoxShape.rectangle,
                 borderRadius: const BorderRadius.all(Radius.circular(12))
              ),
            ),
          ),
        );
      },
    );
  }
}
