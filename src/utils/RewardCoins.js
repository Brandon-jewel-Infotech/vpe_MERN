const getRewardCoins = (reward, items) => {
  let rewardCoins = reward?.coins?.split(",");
  let rewardConditions = reward?.conditions?.split(",");

  if (reward.status == 1) {
    return `${rewardCoins[0] * items} coins will be rewarded for 100 Items`;
  } else if (reward.status == 2) {
    let rewardCoins = Math.floor((items * rewardCoins[0]) / 100);
    return `${rewardCoins[0]} coins will be rewarded for 100 Items`;
  } else if (reward.status == 3) {
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
};

module.exports = getRewardCoins;
