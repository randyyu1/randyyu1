import { LightningElement, track, api, wire } from 'lwc';
import getSuggestions from "@salesforce/apex/MySearchSuggestions.getSuggestions";

export default class MySearch extends LightningElement {
    searching;      //skillName
    @track suggestions;    //skills
    @track result;

    @wire(getSuggestions, {searching: '$searching'})
    receiveSuggestions({data, error}) {
        this.result = {data, error};
        if (data) {
            this.suggestions = data;
        }

        console.log('MySearch: suggestions: ', JSON.stringify(data));
    }

    handleSearchChanged(event) {
        this.searching = event.target.value;
        console.log('MySearch: typed in search: ', this.searching);
    }

    pickSuggestion(event) {     //addRelatedSkill
        alert(event.currentTarget.dataset.suggestid);
        this.searching = null;
        refreshApex(this.result);
    }
}