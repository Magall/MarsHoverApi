import express, { Express, Request, Response } from 'express';
import { HoverOutputDto } from './Dtos/HoverOutputDto';
import 'reflect-metadata';
import helmet from 'helmet';
import dotenv from 'dotenv';
import HoverInputDto from "./Dtos/HoverInputDto";
import { validate } from 'class-validator';
import { Hover } from './Services/hover';
import { HoverOutputData } from './Models/HoverOutputData';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());

// parse application/json
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Hello from the TypeScript world!</h1>');
});
app.post('/move', async (req: Request, res: Response) => {

    // let input = plainToClass(HoverInputDto, req.body)
    let input = new HoverInputDto(req.body.hovers, req.body.limit)
    let hoversOutput:Array<HoverOutputData> = []  
    const resp = await validate(input);
    if (resp.length > 0) {
        res.status(400).send("Error, Inputs are not valids! Chech the data and try again.");
    }
    else {
        try {
            let hover = new Hover();
            input.hovers.forEach(pos => {
                hover.hoverData = pos;
                hover.limit=input.limit;
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
            res.status(500).send(err)
        }

    }
});

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));