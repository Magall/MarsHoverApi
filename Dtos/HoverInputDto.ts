import { HoverData } from "../Models/HoverData";
import Cordinates from "../Models/Cordinates";
export default class  HoverInputDto  {
  public hovers:Array<HoverData>
  public limit:Cordinates
  constructor(hovers:Array<HoverData>,limit:Cordinates){
     this.hovers = hovers;
     this.limit=limit;
  } 
}
