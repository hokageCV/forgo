export namespace types {
	
	export class Task {
	    id: string;
	    title: string;
	    remindtime: string;
	    iscompleted: boolean;
	    isrecurring: boolean;
	    frequency?: string;
	
	    static createFrom(source: any = {}) {
	        return new Task(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.remindtime = source["remindtime"];
	        this.iscompleted = source["iscompleted"];
	        this.isrecurring = source["isrecurring"];
	        this.frequency = source["frequency"];
	    }
	}

}

