//the namespace
var MyNs = MyNs || { };

"use strict";

//class (object)
MyNs.App = function() {

    //constructor
    console.log('The App constructor');

    //properties
}

//methods
MyNs.App.prototype = {

    init: function () {

        //BUILD DOM

        //create Employee object
        var emp = new MyNs.Employee();

        //get all employees in a list element
        emp.all();

        //BUILD EVENT LISTENERS

        //bind event to the addEmployee button
        jQuery('#addEmployee').on('click', function () {

            //create Employee object
            var emp = new MyNs.Employee();

            //define Employee object the properties

            //CASE 1: more C# like style
            emp.name = jQuery('#name').val();
            emp.age = jQuery('#age').val();
            emp.gender = jQuery("#gender option:selected").text();
            emp.occupation = jQuery("#occupation option:selected").text();

            //CASE 2: more Java, Python like style (passing the value as object param)
            //var emp = new MyNs.Employee(
            //    jQuery('#name').val(),
            //    jQuery('#age').val(),
            //    jQuery("#gender option:selected").text(),
            //    jQuery("#occupation option:selected").text()
            //    );

            //save it
            emp.create();
        });
    }
}


