// import 'package:flutter/material.dart';
// import '../../../shared/exports.dart';

// class Uploads extends StatefulWidget {
//   final int pagesIndex;
//   final List<Widget> page;
//   final PageController pageController;
//   const Uploads(
//       {super.key,
//       required this.page,
//       required this.pageController,
//       required this.pagesIndex});

//   @override
//   State<Uploads> createState() => _UploadsState();
// }

// class _UploadsState extends State<Uploads> {
//   int pageIndex = 0;
//   final pageController = PageController();

//   @override
//   Widget build(BuildContext context) {
//     List<Widget> pages = [
//       UploadPicture(
//         description: 'Ghana Card (Front)',
//         onTap: () {},
//       ),
//       UploadPicture(
//         description: 'Ghana Card (Back)',
//         onTap: () {},
//       ),
//       UploadPicture(
//         description: 'Recent Photo',
//         onTap: () {},
//       ),
//       AmountSummary(
//           pages: widget.page,
//           pageIndex: widget.pagesIndex,
//           pageController: widget.pageController,
//           onTap: () => Get.to(const Summary()))
//     ];
//     return Scaffold(
//       body: Stack(
//         children: [
//           PageView(
//             controller: pageController,
//             children: pages,
//             onPageChanged: (index) {
//               setState(() {
//                 pageIndex = index;
//               });
//             },
//           ),
//         ],
//       ),
//     );
//   }
// }
