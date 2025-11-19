import editTranscriptDB from "../db/edit";

const editTranscriptService = async (data: any) => {
  const meeting = await editTranscriptDB(data);

  return meeting;
};

export default editTranscriptService;
