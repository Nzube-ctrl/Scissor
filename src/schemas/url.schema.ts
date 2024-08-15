import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Url extends Document {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ unique: true, required: true })
  shortUrl: string;

  @Prop({ unique: true, sparse: true })
  customUrl: string;

  @Prop({ default: 0 })
  clickCount: number;

  @Prop()
  QrCodeUrl: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
export type UserDocument = Url & Document
