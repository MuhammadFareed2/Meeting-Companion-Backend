import meetingModel from "../../../../mongodb/meetingModel";

const editTranscriptDB = async (data: any) => {
  try {
    const updateFields: any = {};
    if (data.speaker !== undefined) {
      updateFields["utterances.$.speaker"] = data.speaker;
    }
    if (data.text !== undefined) {
      updateFields["utterances.$.text"] = data.text;
    }
    const updated = await meetingModel
      .findOneAndUpdate(
        {
          _id: data._id,
          "utterances._id": data.utteranceId,
        },
        {
          $set: updateFields,
        },
        {
          new: true,
        }
      )
      .lean();
    return updated;
  } catch (err) {
    throw err;
  }
};

export default editTranscriptDB;
