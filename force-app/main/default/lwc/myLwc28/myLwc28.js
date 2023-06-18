import { LightningElement, wire, track } from 'lwc';
import getContactList from '@salesforce/apex/MyApex7.getContactList';

// datatable columns
const columns = [
    { label: 'Name', fieldName: 'Name', sortable: true },
    { label: 'Title', fieldName: 'Title', sortable: true },
    { label: 'Birthdate', fieldName: 'Birthdate', sortable: true, type: 'date', typeAttributes: { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'}},
    { label: 'Phone', fieldName: 'Phone', sortable: true, type: 'phone' },
    { label: 'Email', fieldName: 'Email', sortable: true, type: 'email' },
    { label: 'Department', fieldName: 'Department', sortable: true }
];

export default class MyLwc28 extends LightningElement {
    @track page = 1;    // current page number
    @track pages = [];  // size of data/perPage

    data = []; // array of object data
    perPage = 5; // data items per page
    paginationSize = 5; // number of pages to show at a time (number of page number buttons)
    columns = columns;


    renderedCallback() {
        this.renderButtons();
    }

    /**
     * call the apex method imperatively to get data
     * call a function setPages to initialize the list pages
     * @returns {Promise<void>}
     */
    async connectedCallback() {
        this.data = await getContactList();
        this.setPages(this.data);
    }

    /**
     * apply button variant 'brand' for current page
     */
    renderButtons = () => {
        this.template.querySelectorAll('button').forEach((btn) => {
            this.page === parseInt(btn.dataset.id, 10) ? btn.classList.add('slds-button_brand') : btn.classList.remove('slds-button_brand');
        });
    };

    /**
     * slice data object into pages based on the current page and number of items per page
     * @returns {*[]}
     */
    pageData = () => {
        let page = this.page;
        let perPage = this.perPage;
        let startIndex = (page * perPage) - perPage;
        let endIndex = (page * perPage);
        return this.data.slice(startIndex, endIndex);
    };

    setPages = (data) => {
        let numberOfPages = Math.ceil(data.length / this.perPage);
        for (let index = 1; index <= numberOfPages; index++) {
            this.pages.push(index);
        }
    };

    onNext = () => {
        ++this.page;
    };

    onPrev = () => {
        --this.page;
    };

    onPageClick = (e) => {
        this.page = parseInt(e.target.dataset.id, 10);
    };

    get pagesList() {
        let mid = Math.floor(this.paginationSize / 2) + 1;
        if (this.page > mid) {
            return this.pages.slice(this.page - mid, this.page + mid - 1);
        }
        return this.pages.slice(0, this.paginationSize);
    }

    get hasPrev() {
        return this.page > 1;
    }

    get hasNext() {
        return this.page < this.pages.length
    }

    get currentPageData() {
        return this.pageData();
    }
}