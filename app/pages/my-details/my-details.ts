import {Page, NavController} from 'ionic-angular';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {Data} from '../../providers/data/data';

@Page({
    templateUrl: 'build/pages/my-details/my-details.html',
})
export class MyDetailsPage {

    myDetailsForm:ControlGroup;

    constructor(public nav:NavController, public formBuilder:FormBuilder,
                public dataService:Data) {
        
        this.myDetailsForm = formBuilder.group({
            carRegistration: [''],
            trailerRegistration: [''],
            trailerDimensions: [''],
            phoneNumber: [''],
            notes: ['']
        });
    
        this.dataService.getMyDetails().then((details) => {
            let savedDetails: any = false;
            if(typeof(details) != "undefined") {
                savedDetails = JSON.parse(details);
            }
            
            let formControls: any = this.myDetailsForm.controls;
            if(savedDetails) {
                formControls.carRegistration.updateValue(savedDetails.carRegistration);
                formControls.trailerRegistration.updateValue(savedDetails.trailerRegistration);
                formControls.trailerDimensions.updateValue(savedDetails.trailerDimensions);
                formControls.phoneNumber.updateValue(savedDetails.phoneNumber);
                formControls.notes.updateValue(savedDetails.notes);
            }
        });
    }

    saveForm():void {
        let data = this.myDetailsForm.value;
        this.dataService.setMyDetails(data);
    }
}
