import { IsDefined } from "class-validator";
import Cordinates from "../Models/Cordinates";

export  class  HoverData  {
   @IsDefined()
   limit!:Cordinates;
   @IsDefined()
   startingPosition!:Cordinates;
   @IsDefined()
   startingHeading!:string
   @IsDefined()
   instructions!:Array<string>
   
}