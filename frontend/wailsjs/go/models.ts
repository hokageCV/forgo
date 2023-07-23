export namespace types {
	
	export class Task {
	    id: string;
	    title: string;
	    // Go type: time
	    remindtime: any;
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
	        this.remindtime = this.convertValues(source["remindtime"], null);
	        this.iscompleted = source["iscompleted"];
	        this.isrecurring = source["isrecurring"];
	        this.frequency = source["frequency"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

