import HoverHistory from "./../Models/HoverHistory"

export class HoverOutputData  {
    constructor(finalPos:HoverHistory,hoverHistory:Array<HoverHistory>){
        this.finalPos = finalPos;
        this.hoverHistory = hoverHistory;
    }
    finalPos:HoverHistory;
    hoverHistory:Array<HoverHistory>
 }
 