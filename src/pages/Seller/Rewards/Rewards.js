import React, { useEffect, useState } from "react";
import PrimaryLayout from "../../../Layout/PrimaryLayout";
import FallbackText from "../../../components/FallbackText";
import { RiDeleteBinLine, RiMedalLine } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { logout } from "../../../redux/slice";
import axios from "axios";
import { toast } from "react-toastify";
import AddRewardModal from "../../../modals/AddRewardModal";
import FormField from "../../../components/FormField";

const Rewards = () => {
  const { tok } = useSelector((state) => state.user);
  const [rewards, setRewards] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [selectedReward, setSelectedReward] = useState({});

  const dispatch = useDispatch();

  const getData = async () => {
    setLoadingData(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/rewards`,
        {},
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setRewards(data.results);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
    setLoadingData(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/rewards/delete`,
        { id },
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      if (status === 200) {
        setRewards((currRewards) => currRewards.filter((r) => r.id !== id));
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
  };

  return (
    <PrimaryLayout>
      <AddRewardModal fetchRewards={getData} />
      <UpdateRewardModal
        selectedReward={selectedReward}
        setRewards={setRewards}
      />
      <div className="card bg-white max-w-full">
        <div className="card-body p-0 2xl:mx-auto">
          <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3  justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-start">Reward List</h2>
              {/* <p className="text-md">Rewards &gt; Reward List</p> */}
            </div>
            <button
              className="primary-btn font-semibold"
              onClick={() =>
                document.getElementById("add_reward_modal").showModal()
              }
            >
              <GoPlus size={20} /> Add New
            </button>
          </div>
          {loadingData && (
            <div className="w-40 h-40 mx-auto">
              <Loading />
            </div>
          )}
          {!loadingData &&
            (rewards?.length ? (
              <div className="mt-3 overflow-x-auto min-h-64">
                <table className="table table-zebra table-auto ">
                  <thead className="bg-neutral text-center text-white">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Conditions</th>
                      <th>Coins</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rewards?.map((item) => (
                      <tr key={item?.id}>
                        <td>{item?.id}</td>
                        <td>{item?.name}</td>
                        <td>
                          {item?.status == 1
                            ? "Fixed Value"
                            : item?.status == 2
                            ? "Fixed Percentage"
                            : "Variable Rewards"}
                        </td>
                        <td>{item?.conditions || "N/A"}</td>
                        <td>{item?.coins}</td>
                        <td className="flex gap-4 justify-end">
                          <button
                            className="secondary-btn"
                            onClick={() => deleteHandler(item.id)}
                          >
                            Delete
                          </button>
                          <button
                            className="primary-btn"
                            onClick={() => {
                              setSelectedReward(item);
                              document
                                .getElementById("update_reward_modal")
                                .showModal();
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <FallbackText
                IconRef={RiMedalLine}
                message={"No Rewards Scheme Available"}
                size={150}
              />
            ))}
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default Rewards;

const UpdateRewardModal = ({ selectedReward, setRewards }) => {
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

  const updateRewardScheme = async () => {
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
          `${process.env.REACT_APP_BACKEND_URL}/seller/rewards/update`,
          {
            name,
            coins,
            conditions,
            status: rewardStatus,
            id: selectedReward?.id,
          },
          {
            headers: {
              Authorization: tok,
            },
          }
        ),
        {
          pending: "Updating Reward Scheme...",
          success: "Reward Scheme updated Successfully!",
          error: {
            render({ data }) {
              if (data?.response?.status === 401) {
                dispatch(logout());
                return "Session Expired";
              } else {
                return (
                  data?.response?.data?.error ||
                  "Failed to update Reward Scheme."
                );
              }
            },
          },
        }
      );

      if (status === 200) {
        setRewards((currRewards) =>
          currRewards.map((reward) => {
            if (reward?.id === selectedReward?.id) {
              return {
                ...reward,
                name,
                coins,
                conditions,
                status: rewardStatus,
              };
            }
            return reward;
          })
        );
        document.getElementById("update_reward_modal").close();
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

  const parseCoinsAndConditions = (coinsStr, conditionsStr) => {
    let coinsArray = coinsStr.split(",");
    let conditionsArray = conditionsStr.split(",");

    let coinConditions = coinsArray.map((coin, index) => ({
      coin: coin,
      condition: conditionsArray[index],
    }));

    return coinConditions;
  };

  useEffect(() => {
    setCurrentCoin(1);
    setVariableScheme([]);
    setRewardStatus(selectedReward?.status);
    setName(selectedReward?.name);
    if (selectedReward?.status == 1 || selectedReward?.status == 2) {
      setCurrentCoin(selectedReward.coins);
    } else if (selectedReward?.status == 3) {
      const parsedCoinsAndConditions = parseCoinsAndConditions(
        selectedReward.coins,
        selectedReward.conditions
      );

      setVariableScheme(parsedCoinsAndConditions);
    }
  }, [selectedReward]);

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
    <dialog id="update_reward_modal" className="modal">
      <div className="modal-box">
        <h2 className="font-semibold text-xl my-2">Update Reward Scheme</h2>
        <div className="flex sm:gap-5 max-sm:flex-wrap">
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
            <div className="label">
              <span className="label-text font-semibold"></span>
            </div>
          </label>
        </div>
        {(rewardStatus == 1 || rewardStatus == 2) && (
          <div className="flex max-sm:gap-5 max-sm:flex-wrap max-sm:text-start">
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
              className="flex sm:gap-5 max-sm:flex-wrap"
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
                      className="badge badge-neutral hover:badge-error hover:text-white cursor-pointer relative overflow-hidden"
                      onClick={() => {
                        setVariableScheme((currScheme) => {
                          return currScheme.filter((scheme, ind) => ind != i);
                        });
                      }}
                      key={scheme.condition}
                    >
                      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-transparent hover:text-white hover:bg-error transition-colors duration-500">
                        <RiDeleteBinLine />
                      </div>
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
          <button className=" btn primary-btn" onClick={updateRewardScheme}>
            Update Scheme
          </button>
        </div>
      </div>
    </dialog>
  );
};
