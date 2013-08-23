//namespace
var MyNs = MyNs || {}

"use strict";

//class (object)
MyNs.Employee = function (name, age, gender, occupation) {

    //constructor
    {
        console.log('Employee constructor');
    }

    //properties
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.occupation = occupation;
}

//methods
MyNs.Employee.prototype = {

    all: function () {
        //get data from the db for all employees using ajax
        //create DOM based on all employees data retrieved from the db

        jQuery.ajax({
            url: 'http://localhost:1283/api/Employee',
            type: 'GET',
            dataType: 'json'
        })
            .done(function (data) {

                //BUILD UI

                //remove the list element from the page
                //if exist and rebuild it
                jQuery('#employeesList').remove();

                //build ul element
                var ul = jQuery('<ul>', {
                    'id': 'employeesList'
                });

                //for each Employee in the db
                jQuery.each(data, function (key, val) {

                    //build li elements with the Employee name
                    var li = jQuery('<li>', {
                        'class': 'employee',
                        'data-id': val.EmployeeId,
                        'text': val.Name
                    });
                    //build li elements with the Employee DELETE action
                    var link = jQuery('<a>', {
                        'href': '',
                        'text': 'Delete',
                        'click': function (e) {
                            e.preventDefault();

                            //create new emp object
                            var emp = new MyNs.Employee();
                            //delete the employee
                            emp.drop(val.EmployeeId);
                        }
                    });

                    //append the link to the li
                    link.appendTo(li);
                    //append the li to the ul
                    li.appendTo(ul);
                });
                //append the ul to the allEmployees div
                ul.appendTo(jQuery('#allEmployees'));
            })
            .fail(function (data) {

                if (data !== undefined)
                    alert(data.responseText);
                else
                    throw 'Something went wrong. Please contact the admin!';
            });
    },

    create: function () {
        //execute ajax POST request to create a new Employee in the db

        jQuery.ajax({
            url: 'http://localhost:1283/api/Employee',
            type: 'POST',
            dataType: 'json',
            data: { "Name": this.name, "Age": this.age, "Gender": this.gender, "Occupation": this.occupation }
        })
            .done(function (data) {

                //new Employee object
                var emp = new MyNs.Employee();
                //recreate the table
                emp.all();

        })
            .fail(function (data) {

            if (data !== undefined)
                alert(data.responseText);
            else
                throw 'Something went wrong. Please contact the admin!';

        });
    },

    drop: function (id) {
        //execute ajax DELETE request to drop Employee from the db

        jQuery.ajax({
            url: 'http://localhost:1283/api/Employee/' + id,
            type: 'DELETE'
        })
            .done(function () {
           
            //new Employee object
            var emp = new MyNs.Employee();
            //recreate the table
            emp.all();

            })
            .fail(function () {

            if (data !== undefined)
                alert(data.responseText);
            else
                throw 'Something went wrong. Please contact the admin!';

        });
    }
}