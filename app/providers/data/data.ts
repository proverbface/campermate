import {Injectable} from '@angular/core';
import {SqlStorage, Storage} from 'ionic-angular';

@Injectable()
export class Data {
    storage:Storage;

    constructor() {
        this.storage = new Storage(SqlStorage, {name: 'campermate'});
    }

    setMyDetails(data:Object):void {
        this.storage.set('mydetails', JSON.stringify(data));
    }

    setCampDetails(data:Object):void {
        this.storage.set('campdetails', JSON.stringify(data));
    }

    setLocation(data:Object):void {
        this.storage.set('location', JSON.stringify(data));
    }

    getMyDetails():Promise<any> {
        return this.storage.get('mydetails');
    }

    getCampDetails():Promise<any> {
        return this.storage.get('campdetails');
    }

    getLocation():Promise<any> {
        return this.storage.get('location');
    }

    // to support quicklists
    getData():Promise<any> {
        return this.storage.get('checklists');
    }

    save(data):void {
        let saveData = [];

        // remove all the observables before save
        data.forEach((checklist) => {
            saveData.push({
                title: checklist.title,
                items: checklist.items
            });
        });

        let newData = JSON.stringify(saveData);
        this.storage.set('checklists', newData);
    }
}

