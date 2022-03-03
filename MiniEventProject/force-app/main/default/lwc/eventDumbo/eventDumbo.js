import { LightningElement, track } from 'lwc';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EventDumbo extends LightningElement {
    channelName = '/event/Contact_Updated__e';
    subscription = {};
    contactMessage = 'Default Message: Contact Not Updated';

    connectedCallback(){
        this.registerErrorListener();
        this.handleSubscribe();
    }

    onMessageCallback(){
        const evt = new ShowToastEvent({
            title: 'Contact Updated',
            message: 'Successfully Updated Whatever Contact That Was!',
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }

    handleSubscribe(){
        const messageCallback = (response) => {
            this.contactMessage = response.data.payload.Updated_Contact__c;
        };

        subscribe(this.channelName, 
                  -1, 
                  messageCallback)
        .then((response) => {
            this.subscription = response;
        });
    }

    registerErrorListener(){
        onError((error) => {
            console.log("Received error from server: ", 
                        JSON.stringify(error));
        });
    }
}
