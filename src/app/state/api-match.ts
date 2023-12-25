import { Timestamp, timestamp } from "rxjs"

export class ApiMatch {
    constructor(public idEvent:string='', public strEvent:String='',public dateEvent:Date = new Date(),public strTime:string ='', public strThumb:string='',
    public strBanner:string='',public strVideo:string='',public strStatus:string='', public strResult:string=''){};
}
