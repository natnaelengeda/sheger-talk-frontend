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

export const updateAge = async (chatId: any, age: number) => {
  try {
    await User.update({ age: age }, {
      where: {
        chatId: chatId
      }
    });

  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updateLocation = async (chatId: any, latitude: number, longitude: number) => {
  try {
    await User.update({ latitude: latitude, longitude: longitude }, {
      where: {
        chatId: chatId
      }
    });

  } catch (error) {
    console.log(error);
    return null;
  }
}