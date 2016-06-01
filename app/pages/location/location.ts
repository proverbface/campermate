import {Page, NavController, Platform, Alert} from 'ionic-angular';
import {ElementRef, ViewChild} from '@angular/core';
import {Geolocation} from 'ionic-native';
import {GoogleMaps} from '../../providers/google-maps/google-maps';
import {Data} from '../../providers/data/data';

@Page({
    templateUrl: 'build/pages/location/location.html',
    providers: [GoogleMaps]
})
export class LocationPage {
    @ViewChild('map') mapElement:ElementRef;
    @ViewChild('pleaseConnect') pleaseConnect:ElementRef;

    latitude:number;
    longitude:number;

    constructor(public nav:NavController,
                public maps:GoogleMaps,
                public dataServer:Data,
                public platform:Platform) {

    }

    ngAfterViewInit():void {
        this.dataServer.getLocation().then((location) => {
            let savedLocation:any = false;
            if (typeof(location) != "undefined") {
                savedLocation = JSON.parse(location);
            }

            let mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement);

            if (savedLocation) {
                this.latitude = savedLocation.latitude;
                this.longitude = savedLocation.longitude;
                
                mapLoaded.subscribe(update => {
                    this.maps.changeMarker(this.latitude, this.longitude);
                });
            }
        });
    }

    setLocation():void {
        Geolocation.getCurrentPosition().then((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;

            this.maps.changeMarker(this.latitude, this.longitude);

            let data = {
                latitude: this.latitude,
                longitude: this.longitude
            };

            this.dataServer.setLocation(data);

            let alert = Alert.create({
                title: 'Location set!',
                message: 'You can now find your way back to your campsite from anywhere by clicking the button in the top right corner.',
                buttons: [{text: 'Ok'}]
            });

            this.nav.present(alert);
        });
    }

    takeMeHome():void {
        if (!this.latitude || !this.longitude) {
            let alert = Alert.create({
                title: 'Nowhere to go!',
                message: 'You need to set your camp location first.  For now, want to launch maps to find your own way home?',
                buttons: [
                    {
                        text: 'Nah'
                    },
                    {
                        text: 'Launch away!',
                        handler: data => {
                            // TODO: launch the external maps app.
                        }
                    }
                ]
            });

            this.nav.present(alert);
        } else {
            let destination = this.latitude + ',' + this.longitude;
            if (this.platform.is('ios')) {
                window.open(`maps://?q=${destination}`, "_system");
            } else {
                let label = encodeURI('My Campsite');
                window.open(`geo:0,0?q=${destination}(${label})`, "_system");
            }
        }
    }
}
