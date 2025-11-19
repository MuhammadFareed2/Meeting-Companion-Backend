import editTranscriptDB from "../db/edit.ts";

const editTranscriptService = async (data: any) => {
  const meeting = await editTranscriptDB(data);

  return meeting;
};

export default editTranscriptService;
