import express, { Express, Request, Response } from 'express';
import { HoverOutputDto } from './Dtos/HoverOutputDto';
import 'reflect-metadata';
import helmet from 'helmet';
import dotenv from 'dotenv';
import HoverInputDto from "./Dtos/HoverInputDto";
import { validate } from 'class-validator';
import { Hover } from './Services/hover';
import { HoverOutputData } from './Models/HoverOutputData';
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());

// parse application/json
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
app.post('/move', async (req: Request, res: Response) => {

    let input = new HoverInputDto(req.body.hovers, req.body.limit)
    let hoversOutput: Array<HoverOutputData> = []
    const resp = await validate(input);
    if (resp.length > 0) {
        res.status(400).send("Error, Inputs are not valids! Chech the data and try again.");
    }
    else {
        try {
            let hover = new Hover();
            input.hovers.forEach(pos => {
                hover.hoverData = pos;
                hover.limit = input.limit;
                hover.history = [];
                hover.history.push({ x: pos.startingPosition.x, y: pos.startingPosition.y, heading: pos.startingHeading })
                pos.instructions.forEach(el => {
                    switch (el) {
                        case 'L':
                            hover.turnLeft();
                            break;
                        case 'R':
                            hover.turnRight();
                            break;
                        case 'M':
                            hover.move();
                            break;
                        default:
                            throw Error("Instructions Errors")

                    }
                })
                hoversOutput.push(hover.outputInfo);

            });
            const output = new HoverOutputDto(hoversOutput)
            res.send(output);
        }
        catch (err) {
            res.status(500).send("Error white executing hover's movements.")
        }

    }
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));