import 'package:flutter/material.dart';

class IconWidget extends StatelessWidget {
  final VoidCallback onTap;
  final IconInfo idatas;
  const IconWidget({super.key, required this.idatas, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            width: width * 0.15,
            height: height * 0.078,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              color: const Color.fromARGB(255, 139, 138, 138),
            ),
            child: Padding(
              padding: const EdgeInsets.all(3.0),
              child: Center(
                child: Icon(
                  idatas.iconData,
                  size: 20,
                  color: Colors.white,
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          SizedBox(
            width: 78,
            child: Text(
              idatas.wname,
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.grey, fontSize: 12),
            ),
          )
        ],
      ),
    );
  }
}

class IconInfo {
  final IconData iconData;
  final String wname;

  IconInfo(this.iconData, this.wname);
}

List<IconInfo> idata = [
  IconInfo(Icons.double_arrow_outlined, 'Amount Disbursed'),
  IconInfo(Icons.credit_card_outlined, 'Amount Reimbursed'),
  IconInfo(Icons.attach_money, 'Arrears'),
  IconInfo(Icons.percent_outlined, 'Performanace'),
];
