import 'package:flutter/material.dart';

class ClientData extends StatelessWidget {
  final Client data;
  const ClientData(
    this.data, {
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    // final double height = MediaQuery.of(context).size.height;
    final double width = MediaQuery.of(context).size.width;
    return Row(
      children: [
        Text(
          data.title,
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
          ),
        ),
        const Spacer(),
        SizedBox(
      width: width * 0.2,
      child: Text(
        data.info,
        style: const TextStyle(
          fontSize: 11,
        ),
      ),),
      ],
    );
  }
}

class Client {
  final String title;
  final String info;

  Client(this.title, this.info);
}

List<Client> data = [
  Client("Client’s Name", "Obed Kake"),
  Client("Credit Score:", "20%"),
  Client("Contact", "0246149347"),
  Client("Loan Amount:", "1,000gh"),
  Client("Receipient Account:", "0245******"),
  Client("Terms:", "91 days"),
  Client("Amount to be Paid:", "1,150gh"),
  Client("Payment Schedule:", "55gh/week"),
  Client("Deadline:", "20/04/2023"),
];
