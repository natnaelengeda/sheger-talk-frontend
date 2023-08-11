import User from "../models/User";
export const checkUser = async (chatId: any, username: any) => {
  try {
    const checkuser = await User.findOne({
      where: {
        chatId: chatId
      }
    });

    if (!checkuser) {
      await User.create({
        chatId: chatId,
        username: username || '',
      })
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updateStage = async (chatId: any, stage: number) => {
  try {
    await User.update({ stage: stage }, {
      where: {
        chatId: chatId
      }
    });

  } catch (error) {
    console.log(error);
    return null;
  }
}