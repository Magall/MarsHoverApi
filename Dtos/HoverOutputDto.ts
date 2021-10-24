import { HoverOutputData }from "../Models/HoverOutputData";
export class HoverOutputDto {
    hoverOutputData: Array<HoverOutputData>

    constructor(hoverOutputData: Array<HoverOutputData>) {
        this.hoverOutputData = hoverOutputData;
    }

}
