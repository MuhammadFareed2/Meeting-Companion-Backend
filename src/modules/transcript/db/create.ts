import meetingModel from "../../../../mongodb/meetingModel";

const createTranscriptDB = async (data: any) => {
  console.log(data);
  try {
    const updated = await meetingModel
      .findByIdAndUpdate(
        data._id,
        {
          transcriptId: data.transcript.id,
          utterances: data.transcript.utterances,
        },
        { new: true } // to return the updated document
      )
      .lean();

    return updated;
  } catch (err) {
    throw err;
  }
};

export default createTranscriptDB;
