import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop({
        unique: true,
        required: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        required: true,
        index: true
    })
    email: string;

    @Prop({
        required: true
    })
    password: string;

    @Prop({
        default: Date.now,
        timestamp: true
    })
    createdAt: Date;

    @Prop({
        default: null,
        timestamp: true
    })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
