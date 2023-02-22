import 'package:flutter/material.dart';

class IconWidget extends StatelessWidget {
  final IconInfo idatas;
  const IconWidget({super.key, required this.idatas});

  @override
  Widget build(BuildContext context) {
    final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return GestureDetector(
      onTap: () {},
      child: Column(
        children: [
          Container(
            width: width * 0.15,
            height: height * 0.065,
            decoration: const BoxDecoration(
              shape: BoxShape.rectangle,
              borderRadius: BorderRadius.all(Radius.circular(12)),
              color: Color(0xfff898686),
            ),
            child: Padding(
              padding: const EdgeInsets.all(3.0),
              child: Center(
                child: Icon(
                  idatas.iconData,
                  size: 16,
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 5,
          ),
          SizedBox(
            width: 10,
            child: Text(
              idatas.wname,
              style: const TextStyle(color: Color(0xfff898686), fontSize: 14),
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
