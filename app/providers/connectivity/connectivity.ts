import {Injectable} from '@angular/core';
import {Network, Connection} from 'ionic-native';
import {Platform} from 'ionic-angular';

@Injectable()
export class Connectivity {
    onDevice:boolean;

    constructor(public platform:Platform) {
        this.onDevice = this.platform.is('cordova');
    }

    isOnline():boolean {
        if(this.onDevice && Network.connection) {
            return Network.connection !== Connection.NONE;
        } else {
            return navigator.onLine;
        }
    }
    
    isOffline(): boolean {
        return !this.isOnline();
    }
}

