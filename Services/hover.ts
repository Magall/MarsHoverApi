import { HoverOutputData } from '../Models/HoverOutputData';
import Cordinates from '../Models/Cordinates'
import { HoverData } from '../Models/HoverData';
import HoverHistory from '../Models/HoverHistory';
export class Hover {
    currentPosition!: Cordinates;
    limit!: Cordinates;
    currentHeading!: string;
    angle!: number;
    history: Array<HoverHistory> = []
    public get outputInfo(): HoverOutputData {
        return new HoverOutputData({ x: this.currentPosition.x, y: this.currentPosition.y, heading: this.currentHeading }, this.history)
    }
    public set hoverData(v: HoverData,) {
        this.currentHeading = v.startingHeading;
        this.currentPosition = v.startingPosition;

        this.angle = this.getInitialAngle(v.startingHeading)
    }
    public set value(v: Cordinates) {
        this.limit = v;
    }

    public turnRight(): void {
        this.angle += 90
        this.updateHeading();
        // this.history.push({ x: this.currentPosition.x, y: this.currentPosition.y, heading: this.currentHeading })
    }
    public turnLeft(): void {
        this.angle -= 90
        this.updateHeading();
        // this.history.push({ x: this.currentPosition.x, y: this.currentPosition.y, heading: this.currentHeading })
    }
    public move(): Error | void {

        switch (this.currentHeading) {
            case 'S':
                this.currentPosition.y -= 1;
                if (this.currentPosition.y < 0) {
                    return new Error('Out of bounds !')
                }
                break;
            case 'W':
                this.currentPosition.x -= 1;
                if (this.currentPosition.x < 0) {
                    return new Error('Out of bounds !')
                }
                break;
            case 'N':
                this.currentPosition.y += 1
                if (this.currentPosition.y > this.limit.y) {
                    return new Error('Out of bounds !')
                }
                break;
            case 'E':
                this.currentPosition.x += 1;
                if (this.currentPosition.x > this.limit.x) {
                    return new Error('Out of bounds !')
                }
                break;
            default:
                this.currentPosition.x = -9999999
                this.currentPosition.y = -9999999
                return new Error('Something went wrong while moving.')

        }
        this.history.push({ x: this.currentPosition.x, y: this.currentPosition.y, heading: this.currentHeading })
    }
    private updateHeading(): void {
        if (this.angle % 360 === 90 || this.angle % 360 === -270) {
            this.currentHeading = 'S'
        }
        else if (this.angle % 360 === 180 || this.angle % 360 === -180) {
            this.currentHeading = 'W'
        }
        else if (this.angle % 360 === 270 || this.angle % 360 === -90) {
            this.currentHeading = 'N'
        }
        else if (this.angle % 360 === 0 || this.angle % 360 === -0) {
            this.currentHeading = 'E'
        }
        else {

            throw Error('Incorrect heading  angle  ' + this.angle % 360)
        }
    }

    private getInitialAngle(heading: string): number {
        let resp = -1;
        switch (heading) {
            case 'S':
                resp = 90;
                break;
            case 'W':
                resp = 180;
                break;
            case 'N':
                resp = 270
                break;
            case 'E':
                resp = 360
                break;
            default:
                resp = -1;
                throw new Error('Something went wrong while calculating initial Angle.')

        }
        return resp;
    }
}