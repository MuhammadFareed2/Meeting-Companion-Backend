import meetingModel from "../../../../mongodb/meetingModel";

const generateMomDB = async (data: any, id: any) => {
  try {
    const meeting = await meetingModel
      .findByIdAndUpdate(
        id,
        {
          minutesOfTheMeeting: data,
        },
        { new: true }
      )
      .lean();
    return meeting;
  } catch (err) {
    throw err;
  }
};

export default generateMomDB;
