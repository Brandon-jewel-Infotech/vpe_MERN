import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../redux/slice";
import FormField from "../components/FormField";

export const AddRewardModal = ({ fetchRewards }) => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [rewardStatus, setRewardStatus] = useState(1);
  const [name, setName] = useState("");
  const [variableScheme, setVariableScheme] = useState([]);
  const [currentCoin, setCurrentCoin] = useState(1);
  const [currentCoinAndCondition, setCurrentCoinAndCondition] = useState({
    coin: 1,
    condition: 1,
  });
  const [exampleString, setExampleString] = useState("");

  const addRewardScheme = async () => {
    let coins, conditions;
    if (!name) return toast.error("Please enter a Reward Scheme name.");
    if (rewardStatus == 1 || rewardStatus == 2) {
      coins = currentCoin;
    } else if (rewardStatus == 3 && variableScheme.length > 0) {
      let coinsArray = variableScheme.map((item) => item.coin);
      let conditionsArray = variableScheme.map((item) => item.condition);

      coins = coinsArray.join(",");
      conditions = conditionsArray.join(",");
    }

    try {
      const { status } = await toast.promise(
        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/seller/rewards/create`,
          { name, coins, conditions, status: rewardStatus },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Adding Reward Scheme...",
          success: "Reward Scheme added Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error || "Failed to add Reward Scheme."
                );
              }
            },
          },
        }
      );

      if (status === 201) {
        fetchRewards();
        document.getElementById("add_reward_modal").close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const generateExampleString = (items) => {
    if (rewardStatus == 1) {
      return `${currentCoin * 100} coins will be rewarded for 100 Items`;
    } else if (rewardStatus == 2) {
      let rewardedCoins = Math.floor((100 * currentCoin) / 100);
      return `${rewardedCoins} coins will be rewarded for 100 Items`;
    } else if (rewardStatus == 3) {
      let rewardedCoins = 0;
      let remainingItems = items;

      for (let i = 0; i < variableScheme.length; i++) {
        let currentCondition = Number(variableScheme[i].condition);
        let previousCondition =
          i > 0 ? Number(variableScheme[i - 1].condition) : 0;
        let coinValue = Number(variableScheme[i].coin);

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

      return `Max. ${rewardedCoins} can be rewarded using this scheme`;
    }
  };

  useEffect(() => {
    setExampleString(
      generateExampleString(
        rewardStatus == 3
          ? variableScheme[variableScheme.length - 1]?.condition || 1000
          : 0
      )
    );
  }, [variableScheme.length, currentCoin, rewardStatus]);

  return (
    <dialog id="add_reward_modal" className="modal">
      <div className="modal-box">
        <h2 className="font-semibold text-xl my-2">Add Reward Scheme</h2>
        <div className="flex gap-5 max-sm:flex-wrap">
          <FormField
            name={"name"}
            placeholder={"Name"}
            title={"Name"}
            value={name}
            inputHandler={(e) => {
              setName(e.target.value);
            }}
          />
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-semibold">Status </span>
            </div>
            <select
              className="select select-bordered bg-white"
              onChange={(e) => {
                setRewardStatus(e.target.value);
              }}
              value={rewardStatus}
            >
              <option disabled selected>
                Pick one
              </option>
              <option value={1}>Fixed Value</option>
              <option value={2}>Fixed Percentage</option>
              <option value={3}>Variable Rewards</option>
            </select>
          </label>
        </div>
        {(rewardStatus == 1 || rewardStatus == 2) && (
          <div className="flex gap-5 max-sm:flex-wrap">
            <FormField
              name={"coins"}
              placeholder={"Coins"}
              type={"number"}
              value={currentCoin}
              title={
                rewardStatus == 1
                  ? "Coins to be awarded per item ordered"
                  : "Percentage on which rewards are to be offered"
              }
              inputHandler={(e) => {
                if (e.target.value > 0) setCurrentCoin(e.target.value);
              }}
            />
          </div>
        )}
        {rewardStatus == 3 && (
          <>
            <form
              className="flex gap-5 max-sm:flex-wrap"
              onSubmit={(e) => {
                e.preventDefault();

                if (
                  !currentCoinAndCondition.coin ||
                  !currentCoinAndCondition.condition
                ) {
                  return toast.error(
                    "Please enter condition limit and coins per item.",
                    {
                      toastId: "coin-condition-limit",
                    }
                  );
                }

                if (
                  variableScheme?.findIndex(
                    (currScheme) =>
                      currScheme.condition == currentCoinAndCondition.condition
                  ) !== -1
                ) {
                  return toast.error("Condition already exists", {
                    toastId: "coin-condition-limit",
                  });
                }
                setVariableScheme((currSchemes) => {
                  let newScheme = [...currSchemes, currentCoinAndCondition];
                  newScheme.sort((a, b) => {
                    let conditionA = Number(a.condition);
                    let conditionB = Number(b.condition);
                    return conditionA - conditionB;
                  });
                  return newScheme;
                });
              }}
            >
              <FormField
                name={"condition"}
                placeholder={"Condition"}
                title={"Condition Limit"}
                type={"number"}
                value={currentCoinAndCondition.condition}
                inputHandler={(e) => {
                  if (e.target.value > 0)
                    setCurrentCoinAndCondition((val) => ({
                      ...val,
                      condition: e.target.value,
                    }));
                }}
              />
              <FormField
                name={"coin"}
                placeholder={"Coins"}
                title={"Coins Per Item"}
                type={"number"}
                value={currentCoinAndCondition.coin}
                inputHandler={(e) => {
                  if (e.target.value > 0)
                    setCurrentCoinAndCondition((val) => ({
                      ...val,
                      coin: e.target.value,
                    }));
                }}
              />
              <button type="submit" className="hidden"></button>
            </form>

            {variableScheme?.length > 0 && (
              <>
                <div className="flex gap-3 flex-wrap mb-5">
                  {variableScheme?.map((scheme, i) => (
                    <div
                      className="badge badge-neutral hover:badge-error hover:text-white cursor-pointer"
                      onClick={() => {
                        setVariableScheme((currScheme) => {
                          return currScheme.filter((scheme, ind) => ind != i);
                        });
                      }}
                      key={scheme.condition}
                    >
                      {scheme.condition}, {scheme.coin}
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {currentCoin && rewardStatus != 3 ? (
          <p className="mb-5">
            <span className="font-semibold">For Example:</span> {exampleString}
          </p>
        ) : (
          ""
        )}
        {variableScheme.length > 0 && rewardStatus == 3 ? (
          <p className="mb-5">
            <span className="font-semibold">Note:</span> {exampleString}
          </p>
        ) : (
          ""
        )}
        <div className="flex w-full justify-center gap-4">
          <form method="dialog">
            <button className=" btn secondary-btn">Cancel</button>
          </form>
          <button className=" btn primary-btn" onClick={addRewardScheme}>
            Add Scheme
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddRewardModal;
