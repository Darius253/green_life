import 'package:flutter/material.dart';
import 'package:green_life/shared/exports.dart';

class SelfieUpload extends StatefulWidget {
  const SelfieUpload({super.key});

  @override
  State<SelfieUpload> createState() => _SelfieUploadState();
}

class _SelfieUploadState extends State<SelfieUpload> {
  var selfiepic;

  Future getImage() async {
    var image = await ImagePicker().pickImage(source: ImageSource.camera);
    setState(() {
      selfiepic = image;
    });
  }

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return SafeArea(
        child: Scaffold(
      body: Stack(
        alignment: AlignmentDirectional.center,
        children: [
          Column(
            children: [
              Container(
                height: height * 0.55,
                decoration: const BoxDecoration(
                  borderRadius: BorderRadius.only(
                      bottomLeft: Radius.circular(7),
                      bottomRight: Radius.circular(7)),
                  gradient: LinearGradient(
                    begin: Alignment.centerLeft,
                    end: Alignment.centerRight,
                    colors: [
                      Color.fromARGB(218, 0, 127, 95),
                      Color.fromARGB(209, 84, 165, 49)
                    ],
                  ),
                ),
              ),
              SizedBox(
                height: height * 0.10,
              ),
              Container(
                height: height * 0.30,
                decoration: const BoxDecoration(
                    color: Color(0xFFFFFFFF),
                    image: DecorationImage(
                        image: AssetImage('assets/images/vector.png'))),
              ),
            ],
          ),
          SafeArea(
              child: Padding(
            padding: const EdgeInsets.all(10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(
                  height: height * 0.05,
                ),
                const ImageHolder(),
                SizedBox(
                  height: height * 0.07,
                ),
                const UseCameraButton(),
                SizedBox(
                  height: height * 0.065,
                ),
                SubmitButton(ontap: () {}),
              ],
            ),
          ))
        ],
      ),
    ));
  }
}
