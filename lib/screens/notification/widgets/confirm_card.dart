import 'package:flutter/material.dart';

class ConfirmCard extends StatelessWidget {
  const ConfirmCard({
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
            // child: CircleAvatar(
            //   backgroundImage: AssetImage('assets/images/avatar.png'),
            //   radius: 16,
            // ),
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
              padding: const EdgeInsets.all(6.8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text(
                    'Your loan of ............. has been approved.',
                    style: TextStyle(
                        fontSize: 13,
                        color: Colors.black,
                        fontWeight: FontWeight.w500),
                  ),
                  Row(
                    children: [
                      const SizedBox(
                        width: 6,
                      ),
                      ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                          padding:
                              const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                              minimumSize: const Size(40, 14),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                            side: const BorderSide(color: Colors.green),
                          ),
                          elevation: 5,
                          shadowColor: Colors.green,
                        ),
                        child: const Text(
                          ' Confirm',
                          style: TextStyle(fontSize: 14),
                        ),
                      ),
                      const SizedBox(
                        width: 8,
                      ),
                      ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(
                              horizontal: 8, vertical: 2),
                          minimumSize: const Size(40, 14),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                            side: const BorderSide(color: Colors.green),
                          ),
                          elevation: 5,
                          shadowColor: Colors.green,
                        ),
                        child: const Text(
                          'Deny',
                          style: TextStyle(fontSize: 14, color: Colors.green),
                        ),
                      ),
                    ],
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
