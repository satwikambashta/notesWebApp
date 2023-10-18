//d.ts files are type definition types

import mongoose from "mongoose";

//add to module
declare module "express-session"{
    interface SessionData{
        userId: mongoose.Types.ObjectId;
    }
}