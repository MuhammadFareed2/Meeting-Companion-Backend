import meetingModel from "../../../../mongodb/meetingModel";

const uploadMeetingDB = async (data: any, id: any, body: any) => {
  try {
    const obj = {
      user: id,
      meetingAudio: data,
      meetingName: body.meetingName,
    };
    const meeting = await meetingModel.create(obj);
    return meeting;
  } catch (err) {
    throw err;
  }
};

export default uploadMeetingDB;
