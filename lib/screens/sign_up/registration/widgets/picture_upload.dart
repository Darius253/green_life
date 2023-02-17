import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class UploadPicture extends StatefulWidget {
  final String description;
  const UploadPicture({super.key, required this.description});

  @override
  State<UploadPicture> createState() => _UploadPictureState();
}

class _UploadPictureState extends State<UploadPicture> {
  @override
  Widget build(BuildContext context) {
    double height = MediaQuery.of(context).size.height;
    double width = MediaQuery.of(context).size.width;
    return Scaffold(
        body: SafeArea(
      child: SingleChildScrollView(
        physics: const NeverScrollableScrollPhysics(),
        child: Stack(
          children: [
            Container(
              decoration: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(10),
                      bottomRight: Radius.circular(10)),
                  gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Color.fromARGB(255, 52, 168, 83),
                        Color.fromARGB(255, 0, 127, 95)
                      ])),
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: height * 0.03),
                child: Center(
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text(
                          'You need to Upload your',
                          style: TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              color: Colors.white),
                        ),
                        Text(
                          widget.description,
                          style: const TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.w600,
                              color: Colors.white),
                        ),
                        SizedBox(
                          height: height * 0.02,
                        ),
                        Container(
                          width: width * 0.8,
                          height: height * 0.3,
                          decoration: BoxDecoration(
                              color: const Color.fromARGB(225, 217, 217, 217),
                              borderRadius: BorderRadius.circular(13)),
                          child: Center(
                            child: Icon(
                              CupertinoIcons.camera,
                              color: const Color(0xFF2A353D),
                              size: height * 0.1,
                            ),
                          ),
                        ),
                        SizedBox(
                          height: height * 0.088,
                        ),
                      ]),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(top: height * 0.5),
              child: Center(
                child: Container(
                  width: width * 0.6,
                  height: height * 0.056,
                  decoration: BoxDecoration(
                      boxShadow: const [
                        BoxShadow(
                            color: Color.fromARGB(248, 231, 255, 237),
                            spreadRadius: 0.5,
                            blurRadius: 10),
                      ],
                      color: const Color.fromARGB(255, 211, 215, 0),
                      borderRadius: BorderRadius.circular(40)),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(
                        CupertinoIcons.camera,
                        color: Color(0xFF2A353D),
                      ),
                      SizedBox(
                        width: width * 0.05,
                      ),
                      const Text(
                        'Use Camera',
                        style: TextStyle(
                            fontSize: 20, fontWeight: FontWeight.w500),
                      )
                    ],
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(top: height * 0.65),
              child: Center(
                child: Container(
                  width: width * 0.7,
                  height: height * 0.085,
                  decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 231, 255, 237),
                      borderRadius: BorderRadius.circular(10)),
                  child: ListTile(
                    leading: const Icon(CupertinoIcons.photo),
                    horizontalTitleGap: 0,
                    title: Padding(
                      padding: EdgeInsets.symmetric(vertical: height * 0.02),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Select the document from Gallery  ',
                            textAlign: TextAlign.center,
                            style: TextStyle(fontSize: 13),
                          ),
                          Padding(
                            padding: EdgeInsets.only(left: width * 0.01),
                            child: const Text(
                              'PNG, JPEG OR PDF',
                              style: TextStyle(
                                  fontSize: 10,
                                  color: Color.fromARGB(255, 178, 178, 178)),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.symmetric(vertical: height * 0.8),
              child: GestureDetector(
                onTap: () {},
                child: Center(
                  child: Container(
                    width: width * 0.3,
                    height: height * 0.05,
                    decoration: BoxDecoration(
                        color: const Color.fromARGB(237, 52, 168, 83),
                        boxShadow: const [
                          BoxShadow(
                              color: Color.fromARGB(228, 52, 168, 83),
                              spreadRadius: 5,
                              blurRadius: 10),
                        ],
                        borderRadius: BorderRadius.circular(40)),
                    child: const Center(
                        child: Text(
                      'Submit',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w400,
                        color: Color.fromARGB(255, 255, 255, 255),
                      ),
                    )),
                  ),
                ),
              ),
            ),
            Padding(
              padding: EdgeInsets.only(top: height * 0.7),
              child: Image.asset('assets/images/Vector.png'),
            )
          ],
        ),
      ),
    ));
  }
}
