import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
class Position {
  @Prop({ required: true })
  x: number;

  @Prop({ required: true })
  y: number;
}

@Schema()
class NodeData {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  emoji: string;
}

@Schema()
export class DataNode extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: NodeData })
  data: NodeData;

  @Prop({ type: [{ type: MongooseSchema.Types.Mixed }] })
  children?: DataNode[];
}

@Schema()
export class GraphNode extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, type: NodeData })
  data: NodeData;

  @Prop({ required: true, type: Position })
  position: Position;
}

export const DataNodeSchema = SchemaFactory.createForClass(DataNode);
export const GraphNodeSchema = SchemaFactory.createForClass(GraphNode);
