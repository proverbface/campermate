import {Page} from 'ionic-angular';
import {LocationPage} from '../location/location';
import {MyDetailsPage} from '../my-details/my-details';
import {CampDetailsPage} from '../camp-details/camp-details';
import {QuickListsHomePage} from '../quicklists-home/quicklists-home';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  tab1Root: any = LocationPage;
  tab2Root: any = MyDetailsPage;
  tab3Root: any = CampDetailsPage;
  tab4Root: any = QuickListsHomePage;

  constructor() {

  }
}
