import { model, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoFile: {
      type: String, // cloudinary url
      required: true,
    },
    thumbnail: {
      type: String, // cloudnary url,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = model("Video", videoSchema);
