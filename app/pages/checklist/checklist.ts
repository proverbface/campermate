import {Page, NavController, NavParams, Alert, ItemSliding} from 'ionic-angular';

/*
  Generated class for the ChecklistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
	templateUrl: 'build/pages/checklist/checklist.html',
})
export class ChecklistPage {
	checklist: any;

	constructor(public nav: NavController, public navParams: NavParams) {
		this.checklist = this.navParams.get('checklist');
	}

	addItem(): void {
		let prompt = Alert.create({
			title: 'Add Item',
			message: 'Enter the name of the task for this checklist below:',
			inputs: [
				{
					name: 'name'
				}
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Save',
					handler: data => {
						this.checklist.addItem(data.name);
					}
				}
			]
		});

		this.nav.present(prompt);
	}

	toggleItem(item): void {
		this.checklist.toggleItem(item);
	}

	removeItem(item): void {
		this.checklist.removeItem(item);
	}

	renameItem(item, slidingItem: ItemSliding): void {
		let prompt = Alert.create({
			title: 'Rename Item',
			message: 'Enter the new name of the task for this checklist below:',
			inputs: [
				{
					name: 'name'
				}
			],
			buttons: [
				{
					text: 'Cancel'
				},
				{
					text: 'Save',
					handler: data => {
						this.checklist.renameItem(item, data.name);
					}

				}
			]
		});

		this.nav.present(prompt);
		
		slidingItem.close();
	}

	uncheckItems(): void {
		this.checklist.items.forEach((item) => {
			if (item.checked)
				this.checklist.toggleItem(item);
		});
	}
}
