import mongoose, {Schema} from 'mongoose';
import {Category} from "../types/category";
import {Position} from "../types/position";
import {User} from "./user";

interface HomepageAttrs {
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    userId: string;
    position: Position;
    slug: string;
}

interface HomepageModel extends mongoose.Model<HomepageDoc> {
    build(attrs: HomepageAttrs): HomepageDoc;
}

export interface HomepageDoc extends mongoose.Document {
    title: string;
    content: string;
    imageUrl: string;
    category: string;
    userId: string;
    position: Position;
    slug: string;
}

const homepageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: null,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: Category,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    position: {
        type: Position,
        required: true
    },
    slug: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

homepageSchema.statics.build = (attrs: HomepageAttrs) => {
    return new Homepage(attrs);
};

const Homepage = mongoose.model<HomepageDoc, HomepageModel>('Homepage', homepageSchema);

export { homepageSchema, Homepage };
