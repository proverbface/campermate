import {Page, NavController, Alert, ItemSliding} from 'ionic-angular';
import {ChecklistPage} from '../checklist/checklist';
import {ChecklistModel} from '../../providers/checklist-model/checklist-model';
import {Data} from '../../providers/data/data';

@Page({
	templateUrl: 'build/pages/quicklists-home/quicklists-home.html'
})
export class QuickListsHomePage {
	checklists: ChecklistModel[] = [];

	constructor(public nav: NavController,
		public dataServer: Data) {
		this.dataServer.getData().then((checklists) => {
			let savedCL: any = false;
			if (typeof (checklists) != "undefined") {
				savedCL = JSON.parse(checklists);
			}

			if (savedCL) {
				savedCL.forEach((cl) => {
					let loadCL = new ChecklistModel(cl.title,
						cl.items);
					this.checklists.push(loadCL);
					loadCL.checklist.subscribe(update => {
						this.save();
					})
				});
			}
		});
	}

	addCheckList(): void {
		let prompt = Alert.create({
			title: 'New Checklist',
			message: 'Enter the name of your new checklist below:',
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
						let new_cl = new ChecklistModel(data.name, []);
						this.checklists.push(new_cl);

						new_cl.checklist.subscribe(update => {
							this.save();
						});

						this.save();
					}
				}
			]
		});

		this.nav.present(prompt);
	}

	renameChecklist(checklist, slider: ItemSliding): void {
		let prompt = Alert.create({
			title: 'Rename Checklist',
			message: 'Enter the new name of this checklist below:',
			inputs: [
				{
					name: 'name'
				}
			],
			buttons: [
				{
					text: 'Cancel',
				},
				{
					text: 'Save',
					handler: data => {
						let index = this.checklists.indexOf(checklist);
						if (index > -1) {
							this.checklists[index].setTitle(data.name);
						}
					}
				}
			]
		});

		this.nav.present(prompt);
		slider.close();
	}

	viewChecklist(checklist): void {
		this.nav.push(ChecklistPage, {
			checklist: checklist
		});
	}

	removeChecklist(checklist): void {
		let index = this.checklists.indexOf(checklist);
		if (index > -1) {
			this.checklists.splice(index, 1);
			this.save();
		}
	}

	save(): void {
		this.dataServer.save(this.checklists);
	}
}
