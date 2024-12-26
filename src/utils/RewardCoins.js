const getRewardCoins = (reward, items, amount) => {
  let rewardCoins = reward?.coins?.split(",");
  let rewardConditions = reward?.conditions?.split(",");
  // console.log(amount);

  if (reward?.status == 1) {
    return rewardCoins[0] * items;
  } else if (reward?.status == 2) {
    let rewardedCoins = Math.floor((amount * rewardCoins[0]) / 100);
    return rewardedCoins;
  } else if (reward?.status == 3) {
    let rewardedCoins = 0;
    let remainingItems = items;

    for (let i = 0; i < rewardConditions.length; i++) {
      let currentCondition = Number(rewardConditions[i]);
      let previousCondition = i > 0 ? Number(rewardConditions[i - 1]) : 0;
      let coinValue = Number(rewardCoins[i]);

      if (remainingItems > 0) {
        let applicableItems = Math.min(
          currentCondition - previousCondition,
          remainingItems
        );
        rewardedCoins += applicableItems * coinValue;
        remainingItems -= applicableItems;
      } else {
        break;
      }
    }

    return rewardedCoins;
  }
  return 0;
};

module.exports = getRewardCoins;
