import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:inv_app/Views/Forms/registration.dart';
import 'package:inv_app/Views/modules.dart';
import 'package:inv_app/api/loginService.dart';
import 'package:inv_app/Classes/user.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';

class DateRangePickerForm extends StatefulWidget {
  const DateRangePickerForm({Key? key}) : super(key: key);
  @override
  DateRangePickerFormState createState() {
    return DateRangePickerFormState();
  }
}

class DateRangePickerFormState extends State<DateRangePickerForm> {
  final _formKey = GlobalKey<FormState>();



  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
           const SizedBox(
              height: 40,
            ), 
        ],
      ),
    );
  }

}

class DateRangePicker extends StatefulWidget {
  const DateRangePicker({Key? key}) : super(key: key);
  @override
  _DateRangePickerState createState() => _DateRangePickerState();
}

class _DateRangePickerState extends State<DateRangePicker> {
  DateRangePickerController _dateRangePickerController = DateRangePickerController();

  @override
  Widget build(BuildContext context) 
  {
    //Dizajn
    return SafeArea(
      child: Scaffold(
         backgroundColor: Colors.white,

      //App bar
      appBar: AppBar(
        title: const Text(
          "Date range picker",
          style: TextStyle(
              color: Colors.white, fontFamily: 'Mulish', fontSize: 20),
        ),
        centerTitle: true,
      ),
      
      //Tijelo
      body: SfDateRangePicker(
        view: DateRangePickerView.month,
        monthViewSettings: DateRangePickerMonthViewSettings(firstDayOfWeek: 1),
        selectionMode: DateRangePickerSelectionMode.range,
        showActionButtons: true,
        controller: _dateRangePickerController,
        //TREBA VIDJET STA S TIM!
        /*onSubmit: (Object val){
          print(val);
        },*/
        onCancel: (){
          _dateRangePickerController.selectedRanges=null;
        },
      ),

       bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
              icon: Icon(Icons.qr_code_scanner_rounded),
              title: Text('QR code scanner'),
              backgroundColor: Colors.black),
          BottomNavigationBarItem(
              icon: Icon(Icons.home_filled),
              title: Text('Home'),
              backgroundColor: Colors.blue),
          BottomNavigationBarItem(
              icon: Icon(Icons.person),
              title: Text('My profile'),
              backgroundColor: Colors.black),
        ],
      ),
      )
     
    );
  }

 
}

