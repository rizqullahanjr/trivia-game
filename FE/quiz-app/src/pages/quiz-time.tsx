import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import dataQuiz from "../mocks/question.json";
import Score from "../components/score";
import data from "../mocks/playerGame.json";
import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../libs/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/types/store";
import { useNavigation } from "@react-navigation/native";
import { DATA_PLAYER, addScore } from "../stores/slices/authSlices";
import { SCORE_PLAY } from "../stores/slices/sliceScore";

interface Question {
  Question: string;
  Options: string[];
  Answer: string;
}

interface index {
  index: number;
}

interface opponents {
  id: number;
  avatar: string;
  answer: string;
}

const Quiz = () => {
  const room = useSelector((state: RootState) => state.room.roomId);
  const user = useSelector((state: RootState) => state.player);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [allQuestions, setAllquestion] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOptions, setCorrectOptions] = useState("");
  const [isOptionsDisabled, setisOptionsDisabled] = useState(false);
  const [getScore, setGetScore] = useState(0);
  const [resultText, setResultText] = useState("");
  const [timer, setTimer] = useState(2);
  const [renderAvatarAnswer, setrenderAvatarAnswer] = useState(false);
  const [GetAnswer, setGetAnswer] = useState<opponents[]>([]);
  const [getAvatar, setgetAvatar] = useState([]);
  const playerGame = data;

  // async function getQuestion() {
  //   const res = await axios.get(
  //     "http://192.168.18.174:5000/api/v1/get-question"
  //   );
  //   setAllquestion(res.data);
  //   console.log(res.data);
  //   setTimer(7);
  // }

  async function getQuestion() {
    const quest = await AsyncStorage.getItem("quest");
    setAllquestion(JSON.parse(quest ?? "[]"));
  }

  const handlePress = (selectedOptions: any) => {
    setCurrentOptionSelected(selectedOptions);
    socket.emit(`${room}`, {
      id: user.id,
      quizIndex: currentQuestion,
      answer: selectedOptions,
    });
  };

  const validateAnswer = (selectedOptions: any) => {
    let Answer = allQuestions[currentQuestion]["Answer"];
    setCorrectOptions(Answer);
    setisOptionsDisabled(true);
    setrenderAvatarAnswer(true);
    if (selectedOptions == Answer) {
      setGetScore(getScore + 20);
      setResultText(
        `Jawaban anda benar, adalah ${Answer} jika ${allQuestions[currentQuestion].Question}`
      );
    } else {
      setResultText(
        `Jawaban anda salah, adalah ${Answer} jika ${allQuestions[currentQuestion].Question}`
      );
    }

    // if(currentQuestion== allQuestions.length-1)
    // setCurrentQuestion(currentQuestion + 1);
    // setCurrentOptionSelected(null);
    // setCorrectOptions("");
    // setisOptionsDisabled(false);
    setTimeout(() => {
      moveToNextQuestion();
    }, 1000);
  };

  const moveToNextQuestion = () => {
    // Reset state for the next question
    setCurrentOptionSelected(null);
    setCorrectOptions("");
    setisOptionsDisabled(false);
    setResultText("");
    setTimer(2);
    setrenderAvatarAnswer(false);

    // Move to the next question if available
    if (currentQuestion == allQuestions.length) {
      setCurrentOptionSelected(null);
      setCorrectOptions("");
      setisOptionsDisabled(false);
      setResultText("");
      setTimer(0);
      setrenderAvatarAnswer(false);
    }
    if (currentQuestion < allQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Handle end of questions

      socket.emit(`${room}`, "get score", async (res: any) => {
        console.log(res);
        AsyncStorage.setItem("score", JSON.stringify(res));
        dispatch(SCORE_PLAY(res[2]));
        dispatch(SCORE_PLAY(res[1]));
        dispatch(SCORE_PLAY(res[0]));

        if (user.id == res[0].id) {
          const token = await AsyncStorage.getItem("token");
          axios.put(
            "http://192.168.18.174:8000/api/player/add-diamond",
            { diamond: 5 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          dispatch(
            DATA_PLAYER({
              diamond: user.diamond + 5,
              name: user.name,
              active_avatar: user.active_avatar,
              id: user.id,
              total_score: user.total_score,
              highest_score: user.highest_score,
            })
          );
          navigate.navigate("Board" as never);
        } else {
          navigate.navigate("Loose" as never);
        }
      });
    }
    Animated.timing(progress, {
      toValue: currentQuestion + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ["0%", "100%"],
  });

  const ProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: "blue",
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  useEffect(() => {
    // Automatically validate the answer when the timer reaches 0
    if (timer === 0 && currentOptionSelected !== null) {
      validateAnswer(currentOptionSelected);
      setrenderAvatarAnswer(true);
      console.log("memninta jawaban");
      socket.emit(`${room}`, currentQuestion, (res: any) => {
        console.log(res);
        setGetAnswer(res);
      });
    }
  }, [timer, currentOptionSelected]);

  useEffect(() => {
    getQuestion();
    // setAllquestion(dataQuiz);
  }, []);

  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        source={require("../image/bgImage.jpg")}
        style={styles.container}
      >
        <View style={styles.centered}>
          {/* top */}
          <View>
            <Text>Yoour live score{getScore}</Text>
          </View>
          <View style={styles.score}>
            <Score />
          </View>

          {/* center */}
          <View style={styles.content}>
            <Text style={styles.timer}>
              {/* <CountdownTimer durationInSeconds={20} /> */}
              {timer}
            </Text>

            {/* question */}
            <View style={styles.questionBox}>
              <Text style={styles.question}>
                {allQuestions[currentQuestion]?.Question}
              </Text>
            </View>
            {/* option */}
            <View>
              {allQuestions[currentQuestion]?.Options.map((Options: any) => (
                <TouchableOpacity
                  onPress={() => handlePress(Options)}
                  disabled={isOptionsDisabled}
                  key={Options}
                  style={[
                    styles.answerBox,
                    {
                      borderColor:
                        Options == correctOptions
                          ? "green"
                          : Options == currentOptionSelected
                          ? "blue"
                          : "yellow",
                      backgroundColor:
                        Options == correctOptions
                          ? "rgba(69, 235, 19,0.8)"
                          : Options == currentOptionSelected
                          ? "rgba(25, 22, 22, 0.8)"
                          : "rgba(25, 22, 22, 0.8)",
                    },
                  ]}
                >
                  <Text style={styles.answerText}>{Options}</Text>
                  <View style={{ flexDirection: "row" }}>
                    {renderAvatarAnswer &&
                      GetAnswer.filter(
                        (player) => player.answer === Options
                      ).map((filteredPlayer, playerIndex) => (
                        <Image
                          key={playerIndex}
                          style={styles.avatarPlayer}
                          source={{ uri: filteredPlayer.avatar }}
                        />
                      ))}
                    {/* {renderPlayerImage()} */}
                  </View>
                  {/* check answer */}
                </TouchableOpacity>
              ))}
            </View>
            {/* bar */}
            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
              {resultText}
            </Text>
          </View>
          <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
            {/* quest length */}
            <Text
              style={[styles.answerText, { fontSize: 20, textAlign: "center" }]}
            >
              {currentQuestion + 1}/
              <Text style={[styles.answerText, { fontSize: 20 }]}>
                {allQuestions.length} Question
              </Text>
            </Text>
            {ProgressBar()}
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    // alignItems: "center",
    // justifyContent: "center",
  },
  centered: {
    width: "85%",
    backgroundColor: "rgba(198, 101, 224, 0.5)",
    height: "90%",
    marginHorizontal: "auto",
    marginTop: 30,
  },
  score: {},
  content: {
    width: "90%",
    // backgroundColor: "rgba(198, 101, 224, 0.5)",
    textAlign: "center",
    marginHorizontal: "auto",
    borderRadius: 15,
    position: "relative",
    top: 70,
  },
  timer: {
    fontSize: 30,
    color: "#fc7f03",
    fontFamily: "georgia",
    textAlign: "center",
    marginBottom: 5,
  },
  question: {
    color: "white",
    fontWeight: "100",
    fontFamily: "georgia",
    letterSpacing: 0.5,
    textShadowColor: "black",
    textShadowRadius: 10,
    fontSize: 20,
  },
  questionBox: {
    width: "80%",
    backgroundColor: "rgba(25, 22, 22, 0.5)",
    marginHorizontal: "auto",
    padding: 10,
    borderRadius: 10,
  },
  answerBox: {
    borderWidth: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  answerText: {
    color: "white",
    fontWeight: "200",
    fontFamily: "georgia",
    letterSpacing: 2,
    marginHorizontal: 10,
    marginVertical: 15,
    // textShadowColor: "white",
    // textShadowRadius: 1,
  },
  avatarPlayer: {
    width: 35,
    height: 35,
    backgroundColor: "white",
    objectFit: "cover",
    borderRadius: 100,
    marginHorizontal: 3,
  },
});

// start again?
// if(currentQuestion== allQuestions.length-1)
// setCurrentQuestion(currentQuestion + 1);
// setCurrentOptionSelected(null);
// setCorrectOptions("");
// setisOptionsDisabled(false);

// async function getQuestion() {
//   const res = await axios.get(
//     "http://192.168.18.174:5000/api/v1/get-question"
//   );
//   setAllquestion(res.data);
//   console.log(res.data);
//   setTimer(20);
// }
