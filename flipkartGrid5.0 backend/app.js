const express = require("express");
const bodyParser = require("body-parser");
const Dotenv = require("dotenv");
const { config } = require("serpapi");
const cors = require("cors"); // Import the cors middleware
Dotenv.config();
const apiKey = process.env.API_KEY;
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = process.env.PORT || 5001;
const db = require("./firebase");
const { default: axios } = require("axios");

// Middleware
app.use(cors());
app.use(bodyParser.json());

function mode(array) {
  if (array.length == 0) return null;
  var modeMap = {};
  var maxEl = array[0],
    maxCount = 1;
  for (var i = 0; i < array.length; i++) {
    var el = array[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

// Define API endpoint
app.post("/search", (req, res) => {
  const { imageUrl } = req.body;
  // console.log("google serach");
  const SerpApi = require("google-search-results-nodejs");
  const search = new SerpApi.GoogleSearch(apiKey);

  const params = {
    engine: "google_lens",
    url: imageUrl,
  };

  const callback = function (data) {
    res.json(data);
  };

  // Perform the search and return the results as JSON
  search.json(params, callback);
});

// Define API endpoint
app.post("/getkeywords", async (req, res) => {
  const { userText,prefOption,id } = req.body;
  // console.log("get openai message")
  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `i need you to extract some key words from a given sentence. whatever is present from ("T-Shirt", "Shirt", "Trousers", "Jeans", "Saree", "Dress") you need to take that.i neet you to return only a json object having exact same structure as 
    {
      "Gender": "",
      "T-Shirt": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": "",
        "sleeve": ""
      },
      "Shirt": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": "",
        "sleeve": ""
      },
      "Trousers": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": ""
      },
      "Jeans": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": ""
      },
      "Saree": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": "",
        "type": ""
      },
      "Dress": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": "",
        "length": ""
      }
    }    
    Add all values that are present in sentence, and no need to add new objects and new keys even if that are available in sentenes.Also set 0 for male and 1 for female in gender. 
    and most importantly remove that objects in which all keys are null  .
    Now pls generate output for ${userText}.`,
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  let responseFromPreference = await axios.get(
    `http://localhost:5001/myPreferences/${id}`
  );
  let preference = responseFromPreference.data;
  let str="";
  // console.log(preference);
  const output = JSON.parse(response.data.choices[0].text);
  // console.log(output);
  for(key in output){
    let flag=false;
    if(key==="Gender") continue;
    for(dev in output[key]){
      if(output[key][dev].length!=0) flag=true;
    }
    if(flag&&prefOption==true){
      for(dev in output[key]){
        if(output[key][dev].length==0){
          output[key][dev]=preference[key][dev];
        }
      }
    }
  }
  
  if(output["Gender"]==0){
    str+="Man (wearing) ";
  }
  else{
    str+="Woman (wearing) ";
  }
  for(key in output){
    let flag=false;
    if(key==="Gender") continue;
    for(dev in output[key]){
      if(output[key][dev].length!=0) flag=true;
    }
    if(flag){
      for(dev in output[key]){
        if(output[key][dev].length==0) continue;
        str+="(("+output[key][dev]+")) ";
      }
      str+="(("+key+")), ";
    }
  }
  str+="(Image) , ((Full Body,3)).";
  console.log(str);
  res.send(str);
  return true;
});
app.post("/getWeightObject", async (req, res) => {
  const { userText,prefOption,id } = req.body;
  // console.log("get openai message")
  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `i need you to extract some key words from a given sentence. whatever is present from ("T-Shirt", "Shirt", "Trousers", "Jeans", "Saree", "Dress") you need to take that.i neet you to return only a json object having exact same structure as 
    {
      "Gender": "",
      "T-Shirt": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": "",
        "sleeve": ""
      },
      "Shirt": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": "",
        "sleeve": ""
      },
      "Trousers": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": ""
      },
      "Jeans": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": ""
      },
      "Saree": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": "",
        "type": ""
      },
      "Dress": {
        "brand": "",
        "color": "",
        "fabric": "",
        "pattern": "",
        "length": ""
      }
    }    
    Add all values that are present in sentence, and no need to add new objects and new keys even if that are available in sentenes.Also set 0 for male and 1 for female in gender. 
    and most importantly remove that objects in which all keys are null  .
    Now pls generate output for ${userText}.`,
    temperature: 1,
    max_tokens: 500,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
 
  // console.log(response.data);
  let output=JSON.parse(response.data.choices[0].text);
  let gender=output["Gender"]
  if(prefOption===false){
    let obj={};
    for(key in output){
      if(key==="Gender") continue;
      // console.log(key);
      let flag=false;
      for(dev in output[key]){
        if(output[key][dev].length!=0) flag=true;
      }
      let temp={};
      if(flag){
        for(dev in output[key]){
          if(output[key][dev].length==0) continue;
          temp[dev]=output[key][dev];
        }
        obj[key]=temp;
      }
    }
    res.send([gender,obj]);
  }
  else{
    let responseFromPreference = await axios.get(
      `http://localhost:5001/myPreferences/${id}`
    );
    let preference = responseFromPreference.data;
    for(key in output){
      let flag=false;
      if(key==="Gender") continue;
      for(dev in output[key]){
        if(output[key][dev].length!=0) flag=true;
      }
      if(flag&&prefOption==true){
        for(dev in output[key]){
          if(output[key][dev].length==0){
            output[key][dev]=preference[key][dev];
          }
        }
      }
    }
    let obj={};
    for(key in output){
      if(key==="Gender") continue;
      let flag=false;
      for(dev in output[key]){
        if(output[key][dev].length!=0) flag=true;
      }
      let temp={};
      if(flag){
        for(dev in output[key]){
          if(output[key][dev].length==0) continue;
          temp[dev]=output[key][dev];
        }
        obj[key]=temp;
      }
    }
    res.send([gender,obj]);
  }
  return true;
});
app.post("/weightedResponse",async(req,res)=>{
  let {weightedObj,gender}=req.body;
  let str="";
  if(gender==0){
    str+="(Full Body,3) (Image,3) of (Man,3) (wearing,2) "
  }
  else{
    str+="(Full Body,3) (Image,3) of (Woman,3) (wearing,2) "
  }
  for(key in weightedObj){
    for(dev in weightedObj[key]){
      str+="("+weightedObj[key][dev].value+","+weightedObj[key][dev].count+") ";
    }
    str+="("+key+",2),"
  }
  console.log(str);
  res.send(str);
})
//get user visited products
app.get("/myHistory/:id", (req, res) => {
  const id = req.params.id;
  var ref = db.ref(`productdata/${id}`);
  ref
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        res.send(Object.values(data));
      } else {
        res.send([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal server error");
    });
  return true;
});
//get user preferences
app.get("/myPreferences/:id", (req, res) => {
  const id = req.params.id;
  var ref = db.ref(`productdata/${id}`);
  ref
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        let arr = Object.values(data);
        let types = ["T-Shirt", "Shirt", "Trousers", "Jeans", "Saree", "Dress"];
        let obj = {
          "T-Shirt": {
            brand: [],
            color: [],
            fabric: [],
            pattern: [],
            sleeve: [],
          },
          Shirt: {
            brand: [],
            color: [],
            fabric: [],
            pattern: [],
            sleeve: [],
          },
          Trousers: {
            brand: [],
            color: [],
            fabric: [],
            pattern: [],
          },
          Jeans: {
            brand: [],
            color: [],
            fabric: [],
            pattern: [],
          },
          Saree: {
            brand: [],
            color: [],
            fabric: [],
            pattern: [],
            type: [],
          },
          Dress: {
            brand: [],
            color: [],
            fabric: [],
            pattern: [],
            length: [],
          },
        };
        let ans = {
          "T-Shirt": {
            brand: "",
            color: "",
            fabric: "",
            pattern: "",
            sleeve: "",
          },
          Shirt: {
            brand: "",
            color: "",
            fabric: "",
            pattern: "",
            sleeve: "",
          },
          Trousers: {
            brand: "",
            color: "",
            fabric: "",
            pattern: "",
          },
          Jeans: {
            brand: "",
            color: "",
            fabric: "",
            pattern: "",
          },
          Saree: {
            brand: "",
            color: "",
            fabric: "",
            pattern: "",
            type: "",
          },
          Dress: {
            brand: "",
            color: "",
            fabric: "",
            pattern: "",
            length: "",
          },
        };
        for (let j = 0; j < arr.length; j++) {
          for (key in obj[arr[j].category]) {
            obj[arr[j].category][key].push(arr[j][key]);
          }
        }
        for (let j = 0; j < types.length; j++) {
          for (key in ans[types[j]]) {
            ans[types[j]][key] = mode(obj[types[j]][key]);
          }
        }
        const filteredData = Object.fromEntries(
          Object.entries(ans).filter(([key, value]) =>
            Object.values(value).some((val) => val !== null)
          )
        );
        res.send(filteredData);
      } else {
        res.send([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal server error");
    });
  return true;
});

//get user generated images
app.get("/myGneratedHistory/:id", (req, res) => {
  const id = req.params.id;
  var ref = db.ref(`historyData/${id}`);
  ref
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        res.send(Object.values(data));
      } else {
        res.send([]);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      res.status(500).send("Internal server error");
    });
  return true;
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
