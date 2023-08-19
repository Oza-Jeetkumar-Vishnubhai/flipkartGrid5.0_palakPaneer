import { useState } from "react";
import React from "react";
import HistoryModel from "../components/HistoryModel";
import ResultsHistoryModel from "../components/ResultsHistoryModel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TuneIcon from "@mui/icons-material/Tune";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import SendIcon from "@mui/icons-material/Send";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LoadingSkeleton from "../components/LoadingSkeleton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import ToggleButton from "@mui/material/ToggleButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import HistoryIcon from "@mui/icons-material/History";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import magicIcon from "../images/magic.gif";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";
import loading2 from "react-useanimations/lib/loading2";
import Tooltip from "@mui/material/Tooltip";
import ProductsBox from "./ProductsBox";
import axios from "axios";
import { auth } from "../firebaseFiles/firebase";
import shortid from "shortid";
import { imageStorage, database } from "../firebaseFiles/firebase";
import LineWeightIcon from "@mui/icons-material/LineWeight";
import OutfitWeightsModel from "../components/OutfitWeightsModel";
const MainBody = () => {
  const [statusText, setstatusText] = useState("");
  const [showModel, setshowModel] = useState(false);
  const [showResultsHistoryModel, setshowResultsHistoryModel] = useState(false);
  const [showOutfitWeightsModel, setshowOutfitWeightsModel] = useState(false);
  const [imageSourceLink, setimageSourceLink] = useState(null);
  const [imageSource, setimageSource] = useState(false); // true,false,"loading"
  const [imageUploadedURL, setimageUploadedURL] = useState();
  const [googleLensSesultsStatus, setgoogleLensSesultsStatus] = useState(false); // true,false,"loading"
  const [googleLensResults, setgoogleLensResults] = useState(null);
  const [magicInput, setmagicInput] = useState(false); //true ,false
  const [userInputText, setuserInputText] = useState("");
  const [userMagicTextInput, setuserMagicTextInput] = useState("");
  const [preferenceFeature, setpreferenceFeature] = useState(true);
  const [weightsFeature, setweightsFeature] = useState(true);
  const [objectBeforeWeights, setobjectBeforeWeights] = useState({});
  const [userGender, setuserGender] = useState(0);
  // Convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([intArray], { type: mimeString });
  };
  //get id from email
  const getStringBeforeAt = (email) => {
    const parts = email.split("@");
    if (parts.length === 2) {
      return parts[0];
    } else {
      return null; // Invalid email format
    }
  };
  // ==========Google lens search============
  const handleSearch = async () => {
    setgoogleLensSesultsStatus("loading");
    try {
      const response = await axios.post("http://localhost:5001/search", {
        imageUrl: imageUploadedURL,
      });
      setgoogleLensResults(response?.data);
      setgoogleLensSesultsStatus(true);
    } catch (error) {
      console.error("Error searching for image:", error);
      setgoogleLensSesultsStatus(false);
    }
  };
  // ========================================
  // ============get image from weighted object========
  const weightedtext2img = async (weightedObject) => {
    try {
      const textResponse = await axios.post(
        "http://localhost:5001/weightedResponse",
        {
          weightedObj: weightedObject,
          gender: userGender,
        }
      );
      setstatusText("Generating Image...");
      const imageResponse = await axios.post(
        "http://127.0.0.1:7860/sdapi/v1/txt2img",
        {
          prompt: textResponse?.data,
          steps: 10,
        }
      );
      const imageBase64 = imageResponse?.data?.images[0];
      // `data:image/png;base64,${imageSourceLink}`
      //upload image generated to storage and database
      setstatusText("Saving generated results...");
      const blob = dataURItoBlob(`data:image/png;base64,${imageBase64}`);
      const file = new File([blob], `${shortid.generate()}.png`, {
        type: "image/png",
      });
      const response = await imageStorage.createFile(
        "64de5752e52b4ff1afe1",
        shortid.generate(),
        file
      );
      const fileId = response.$id;
      const imageUrl = imageStorage.getFilePreview(
        "64de5752e52b4ff1afe1",
        fileId
      ); // Get preview URL
      await database
        .ref(`historyData/${getStringBeforeAt(auth?.currentUser?.email)}/`)
        .push({
          imageText: userInputText,
          imageUrl: imageUrl?.href,
        });
      setimageUploadedURL(imageUrl?.href);
      setimageSource(true);
      setimageSourceLink(imageBase64);
    } catch (error) {
      console.error("Error for this:", error);
      setimageSource(false);
    }
  };
  // ==============text2img=============
  const text2img = async () => {
    if (weightsFeature) {
      setimageSource("loading");
      try {
        //get weights object
        setstatusText("Analysing user input...");
        const textResponse = await axios.post(
          "http://localhost:5001/getWeightObject",
          {
            userText: userInputText,
            prefOption: preferenceFeature,
            id: getStringBeforeAt(auth?.currentUser?.email),
          }
        );
        setuserGender(textResponse?.data[0]);
        const objectBeWe = textResponse?.data[1];
        setobjectBeforeWeights(objectBeWe);
        setshowOutfitWeightsModel(true);
      } catch (error) {
        console.error("Error for this:", error);
        setimageSource(false);
      }
    } else {
      setimageSource("loading");
      try {
        //get nlp ready user string
        setstatusText("Analysing user input...");
        const textResponse = await axios.post(
          "http://localhost:5001/getkeywords",
          {
            userText: userInputText,
            prefOption: preferenceFeature,
            id: getStringBeforeAt(auth?.currentUser?.email),
          }
        );
        //generate image from nlp generated string
        setstatusText("Generating Image...");
        const imageResponse = await axios.post(
          "http://127.0.0.1:7860/sdapi/v1/txt2img",
          {
            prompt: textResponse?.data,
            steps: 10,
          }
        );
        const imageBase64 = imageResponse?.data?.images[0];
        // `data:image/png;base64,${imageSourceLink}`
        //upload image generated to storage and database
        setstatusText("Saving generated results...");
        const blob = dataURItoBlob(`data:image/png;base64,${imageBase64}`);
        const file = new File([blob], `${shortid.generate()}.png`, {
          type: "image/png",
        });
        const response = await imageStorage.createFile(
          "64de5752e52b4ff1afe1",
          shortid.generate(),
          file
        );
        const fileId = response.$id;
        const imageUrl = imageStorage.getFilePreview(
          "64de5752e52b4ff1afe1",
          fileId
        ); // Get preview URL
        await database
          .ref(`historyData/${getStringBeforeAt(auth?.currentUser?.email)}/`)
          .push({
            imageText: userInputText,
            imageUrl: imageUrl?.href,
          });
        setimageUploadedURL(imageUrl?.href);
        setimageSource(true);
        setimageSourceLink(imageBase64);
      } catch (error) {
        console.error("Error for this:", error);
        setimageSource(false);
      }
    }
  };
  // ============download image==============
  const downloadImage = async () => {
    try {
      const response = await fetch(imageUploadedURL);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };
  // ============img2img using magic text==========
  const img2imgUsingText = async () => {
    setimageSource("loading");
    try {
      setstatusText("Generating Image...");
      const imageresponse = await axios.post(
        "https://b1f3-34-141-247-150.ngrok-free.app/process_image",
        {
          url: imageUploadedURL,
          prompt: userMagicTextInput,
        }
      );

      const imageBase64 = imageresponse?.data?.processed_image_base64;
      // `data:image/png;base64,${imageSourceLink}`
      //upload image generated to storage and database
      setstatusText("Saving generated results...");
      const blob = dataURItoBlob(`data:image/png;base64,${imageBase64}`);
      const file = new File([blob], `${shortid.generate()}.png`, {
        type: "image/png",
      });
      const response = await imageStorage.createFile(
        "64de5752e52b4ff1afe1",
        shortid.generate(),
        file
      );
      const fileId = response.$id;
      const imageUrl = imageStorage.getFilePreview(
        "64de5752e52b4ff1afe1",
        fileId
      ); // Get preview URL
      await database
        .ref(`historyData/${getStringBeforeAt(auth?.currentUser?.email)}/`)
        .push({
          imageText: `${userInputText} (${magicInput})`,
          imageUrl: imageUrl?.href,
        });
      setimageUploadedURL(imageUrl?.href);

      setimageSourceLink(imageresponse?.data?.processed_image_base64);
      setimageSource(true);
    } catch (error) {
      console.error("Error searching for image:", error);
      setimageSource(false);
    }
  };
  return (
    <>
      <HistoryModel visible={showModel} chnagevisible={setshowModel} />
      <ResultsHistoryModel
        visible={showResultsHistoryModel}
        chnagevisible={setshowResultsHistoryModel}
      />
      <OutfitWeightsModel
        initialProductPreferences={objectBeforeWeights}
        visible={showOutfitWeightsModel}
        chnagevisible={setshowOutfitWeightsModel}
        mainFunction={weightedtext2img}
      />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Grid
          container
          sx={{
            height: "100%",
            width: "100%",
          }}
        >
          {/* =========================================================  LEFT COMPONENT ========================================================= */}
          <Grid
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            item
            xs={6}
            pt={2}
            pb={1}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flex: 1,
                }}
              ></div>
              <div
                style={{
                  width: "400px",
                  height: "400px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "0.3px dashed  rgb(134 143 152)",
                  borderRadius: "8px",
                  fontSize: "15px",
                  color: "rgb(134 143 152)",
                  fontWeight: "500",
                }}
              >
                {imageSource === true ? (
                  <img
                    style={{
                      width: "400px",
                      height: "400px",
                      marginRight: "5px",
                    }}
                    src={`data:image/png;base64,${imageSourceLink}`}
                    alt="loading..."
                  />
                ) : imageSource === "loading" ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <LoadingSkeleton />
                    <div>{statusText}</div>
                  </div>
                ) : (
                  <>preview</>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  style={{
                    borderWidth: "1px",
                    backgroundColor: "rgb(24 24 24)",
                  }}
                  disabled={imageSource === true ? false : true}
                  onClick={handleSearch}
                >
                  {imageSource === true ? (
                    <ShoppingCartIcon sx={{ color: "#1f88d9" }} />
                  ) : (
                    <RemoveShoppingCartIcon
                      sx={{ color: "rgb(134 143 152)" }}
                    />
                  )}
                </IconButton>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexDirection: "column",
                flexWrap: "wrap",
              }}
            >
              <Button
                onClick={() => setmagicInput((isOpen) => !isOpen)}
                className={imageSource === true ? "MagicButton" : ""}
                size="small"
                disabled={imageSource === true ? false : true}
                style={{
                  backgroundColor: "rgb(24 24 24)",
                }}
              >
                <AutoAwesomeIcon fontSize="small" />
                <span style={{ marginRight: "6px", marginLeft: "6px" }}>
                  Modify
                </span>
                <AutoAwesomeIcon fontSize="small" />
              </Button>
              {/* modify input text input and option buttons */}
              {magicInput ? (
                <Paper
                  component="form"
                  sx={{
                    p: "0",
                    display: "flex",
                    alignItems: "center",
                    width: "60%",
                    background: "transparent",
                    boxShadow: "none",
                  }}
                  style={{
                    border: "1px dashed #1f88d9",
                  }}
                >
                  <InputBase
                    sx={{ ml: 2, flex: 1, color: "#3d95da" }}
                    placeholder="Enter changes you want to apply"
                    value={userMagicTextInput}
                    onChange={(event) => {
                      setuserMagicTextInput(event.target.value);
                    }}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                    disabled={imageSource === "loading" ? true : false}
                    onClick={img2imgUsingText}
                  >
                    {imageSource === "loading" ? (
                      <UseAnimations
                        animation={infinity}
                        size={24}
                        strokeColor={"#1f88d9"}
                      />
                    ) : (
                      <AutoFixHighIcon
                        sx={{ color: "#1f88d9", fontSize: 16 }}
                      />
                    )}
                  </IconButton>
                </Paper>
              ) : (
                <Stack direction="row" spacing={2}>
                  <Button
                    style={{
                      backgroundColor: "rgb(24 24 24)",
                      color: "rgb(134 143 152)",
                    }}
                    onClick={downloadImage}
                    disabled={!imageSource}
                  >
                    <span style={{ marginRight: "6px" }}>Download</span>
                    <DownloadForOfflineIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "rgb(24 24 24)",
                      color: "rgb(134 143 152)",
                    }}
                    onClick={() => {
                      setshowModel(!showModel);
                    }}
                  >
                    <span style={{ marginRight: "6px" }}>Preference</span>{" "}
                    <TuneIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "rgb(24 24 24)",
                      color: "rgb(134 143 152)",
                    }}
                    onClick={() => {
                      setshowResultsHistoryModel(!showResultsHistoryModel);
                    }}
                  >
                    <span style={{ marginRight: "6px" }}>History</span>
                    <HistoryIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    style={{
                      backgroundColor: "rgb(24 24 24)",
                      color: "rgb(134 143 152)",
                    }}
                    onClick={() => {
                      setimageSource(false);
                      setstatusText("");
                      setshowModel(false);
                      setshowResultsHistoryModel(false);
                      setshowOutfitWeightsModel(false);
                      setimageSourceLink(null);
                      setimageUploadedURL("");
                      setgoogleLensSesultsStatus(false);
                      setgoogleLensResults(null);
                      setmagicInput(false);
                      setuserInputText("");
                      setpreferenceFeature(true);
                      setweightsFeature(true);
                      setobjectBeforeWeights({});
                      setuserGender(0);
                    }}
                  >
                    <span style={{ marginRight: "6px" }}>Reset</span>
                    <RestartAltIcon fontSize="small" />
                  </Button>
                </Stack>
              )}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Paper
                component="form"
                sx={{
                  p: "2px 4px 2px 10px",
                  display: "flex",
                  alignItems: "center",
                  width: "80%",
                  background: "rgb(24 24 24)",
                  boxShadow: "none",
                }}
              >
                <img
                  style={{ width: "30px", height: "30px" }}
                  src={magicIcon}
                  alt="send"
                />
                <InputBase
                  sx={{ ml: 2, pr: 1, flex: 1, color: "rgb(134 143 152)" }}
                  placeholder="Enter your fashion choice"
                  value={userInputText}
                  onChange={(event) => {
                    setuserInputText(event.target.value);
                  }}
                />
                <Tooltip
                  title="Enable this option to use your own weight for outfits"
                  arrow
                  placement="top-start"
                >
                  <ToggleButton
                    color="success"
                    value="check"
                    selected={weightsFeature}
                    sx={{
                      padding: "8px",
                      borderColor: "rgb(31 31 31)",
                      color: "rgb(134 143 152)",
                    }}
                    onChange={() => {
                      setweightsFeature(!weightsFeature);
                    }}
                  >
                    <LineWeightIcon />
                  </ToggleButton>
                </Tooltip>
                <Tooltip
                  title="Enable this option to use your preference"
                  arrow
                  placement="top-start"
                >
                  <ToggleButton
                    color="success"
                    value="check"
                    selected={preferenceFeature}
                    sx={{
                      padding: "8px",
                      borderColor: "rgb(31 31 31)",
                      color: "rgb(134 143 152)",
                      ml: 1,
                    }}
                    onChange={() => {
                      setpreferenceFeature(!preferenceFeature);
                    }}
                  >
                    <SettingsAccessibilityIcon />
                  </ToggleButton>
                </Tooltip>
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={text2img}
                >
                  {imageSource === "loading" ? (
                    <UseAnimations
                      animation={infinity}
                      size={24}
                      strokeColor={"#1f88d9"}
                    />
                  ) : (
                    <SendIcon sx={{ color: "#1f88d9" }} />
                  )}
                </IconButton>
              </Paper>
            </div>
          </Grid>
          {/* =========================================================  RIGHT COMPONENT ========================================================= */}
          <Grid
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            item
            xs={6}
            p={2}
            pt={0}
            pb={1}
          >
            {googleLensSesultsStatus === "loading" ? (
              <UseAnimations
                fillColor={"rgb(31 31 31)"}
                strokeColor={"rgb(134 143 152)"}
                animation={loading2}
                size={80}
              />
            ) : googleLensSesultsStatus === true ? (
              <ProductsBox productsData={googleLensResults} />
            ) : (
              <div
                style={{
                  width: "70%",
                  fontSize: "15px",
                  color: "rgb(134 143 152)",
                  fontWeight: "500",
                  textAlign: "justify",
                }}
              >
                <p>
                  Please enter the attire you desire from the image in the text
                  field located at the bottom left. Kindly input your fashion
                  preference.
                </p>
                <p>
                  Once the desired outfit is generated, you can customize it
                  further by clicking the "Magic" button. Simply enter your
                  desired changes in the provided input field labeled "Enter
                  changes you want to apply." This allows you to tailor the
                  outfit to your specific requirements.
                </p>
                <p>
                  After your preferred fashion outfit is generated, you can
                  access product recommendations from Flipkart by clicking the
                  shopping icon on the left side of the image.
                </p>
              </div>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MainBody;
