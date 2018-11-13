import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    templateUrl: "./element-aspects.component.html",
    styleUrls: ["./index.scss"]
})
export class ElementAspectsComponent {

    data = [
        {
            "ID": 1,
            "name": "Super Mart of the West",
            "created": "702 SW 8th Street",
            "modified": "Bentonville",
            "State": "Arkansas",
            "Zipcode": 72716,
            "Phone": "(800) 555-2797",
            "Fax": "(800) 555-2171",
            "Website": "http://www.nowebsitesupermart.com"
        }, {
            "ID": 2,
            "name": "Electronics Depot",
            "created": "2455 Paces Ferry Road NW",
            "modified": "Atlanta",
            "State": "Georgia",
            "Zipcode": 30339,
            "Phone": "(800) 595-3232",
            "Fax": "(800) 595-3231",
            "Website": "http://www.nowebsitedepot.com"
        }, {
            "ID": 3,
            "name": "K&S Music",
            "created": "1000 Nicllet Mall",
            "modified": "Minneapolis",
            "State": "Minnesota",
            "Zipcode": 55403,
            "Phone": "(612) 304-6073",
            "Fax": "(612) 304-6074",
            "Website": "http://www.nowebsitemusic.com"
        }, {
            "ID": 4,
            "name": "Tom's Club",
            "created": "999 Lake Drive",
            "modified": "Issaquah",
            "State": "Washington",
            "Zipcode": 98027,
            "Phone": "(800) 955-2292",
            "Fax": "(800) 955-2293",
            "Website": "http://www.nowebsitetomsclub.com"
        }, {
            "ID": 5,
            "name": "E-Mart",
            "created": "3333 Beverly Rd",
            "modified": "Hoffman Estates",
            "State": "Illinois",
            "Zipcode": 60179,
            "Phone": "(847) 286-2500",
            "Fax": "(847) 286-2501",
            "Website": "http://www.nowebsiteemart.com"
        }, {
            "ID": 6,
            "name": "Walters",
            "created": "200 Wilmot Rd",
            "modified": "Deerfield",
            "State": "Illinois",
            "Zipcode": 60015,
            "Phone": "(847) 940-2500",
            "Fax": "(847) 940-2501",
            "Website": "http://www.nowebsitewalters.com"
        }, {
            "ID": 7,
            "name": "StereoShack",
            "created": "400 Commerce S",
            "modified": "Fort Worth",
            "State": "Texas",
            "Zipcode": 76102,
            "Phone": "(817) 820-0741",
            "Fax": "(817) 820-0742",
            "Website": "http://www.nowebsiteshack.com"
        }, {
            "ID": 8,
            "name": "Circuit Town",
            "created": "2200 Kensington Court",
            "modified": "Oak Brook",
            "State": "Illinois",
            "Zipcode": 60523,
            "Phone": "(800) 955-2929",
            "Fax": "(800) 955-9392",
            "Website": "http://www.nowebsitecircuittown.com"
        }, {
            "ID": 9,
            "name": "Premier Buy",
            "created": "7601 Penn Avenue South",
            "modified": "Richfield",
            "State": "Minnesota",
            "Zipcode": 55423,
            "Phone": "(612) 291-1000",
            "Fax": "(612) 291-2001",
            "Website": "http://www.nowebsitepremierbuy.com"
        }, {
            "ID": 10,
            "name": "ElectrixMax",
            "created": "263 Shuman Blvd",
            "modified": "Naperville",
            "State": "Illinois",
            "Zipcode": 60563,
            "Phone": "(630) 438-7800",
            "Fax": "(630) 438-7801",
            "Website": "http://www.nowebsiteelectrixmax.com"
        }, {
            "ID": 11,
            "name": "Video Emporium",
            "created": "1201 Elm Street",
            "modified": "Dallas",
            "State": "Texas",
            "Zipcode": 75270,
            "Phone": "(214) 854-3000",
            "Fax": "(214) 854-3001",
            "Website": "http://www.nowebsitevideoemporium.com"
        }, {
            "ID": 12,
            "name": "Screen Shop",
            "created": "1000 Lowes Blvd",
            "modified": "Mooresville",
            "State": "North Carolina",
            "Zipcode": 28117,
            "Phone": "(800) 445-6937",
            "Fax": "(800) 445-6938",
            "Website": "http://www.nowebsitescreenshop.com"
        }];

}