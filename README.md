<h1 align="center">
  <img src="https://cloud.appwrite.io/v1/storage/buckets/64de5752e52b4ff1afe1/files/64e1dba62bb9d158ccae/view?project=64de56dad1e7b4e01d6c&mode=admin" width="100"><br>
  <a href="https://github.com/Oza-Jeetkumar-Vishnubhai/flipkartGrid5.0_palakPaneer" style="color: black"><span>FliplookAi</span></a><br>
</h1>

<p align="center">
Conversational Fashion Outfit Generator powered by GenAI.
</p>
  
With the advent of Generative AI, Search and finding a product is being revolutionised. We are
moving away from a single open text box experience to something more conversational and this
will enable product discovery and recommendations to be a lot more powerful than they are
today by way of being able to truly understand the user’s needs in a more human-like
conversational way. Fashion is one of the categories where discovery will get reset.
As part of this challenge, teams need to create an Gen AI-powered fashion outfit generator for
Flipkart that revolutionizes the way users discover and create personalized fashion outfits, in a
natural conversational way. The outfit generator should leverage user's past purchase history,
preferences based on browsing data, and insights from social media trends to offer tailored and
on-trend outfit recommendations.

The fashion outfit generator should have the ability to analyze a user's past purchase history and
understand their preferred style, color choices, and favorite brands. By considering these
preferences, the generator should look to suggest outfits that align with the user's unique fashion
taste. Additonally, the generator can take into account the types of clothing items the user
frequently views or adds to their cart, ensuring that the outfit recommendations are relevant and
appealing.

In addition to individual user data, the fashion outfit generator should tap into social media
trends to provide up-to-date fashion recommendations. It should be able to analyze current
fashion trends, styles, and influencers on platforms like Instagram, Pinterest, and fashion
blogs. By combining this data with the user's preferences, the generator can suggest outfits
that are not only personalized but also in line with the latest fashion trends.
The generated outfit recommendations should be complete and well-coordinated, including
clothing, accessories, and footwear etc. The generator should consider factors such as the user's
body type, occasion (e.g., casual, formal, party), and regional and age preferences (Ex. Young 20
year old woman looking for a Diwali outfit in Mumbai should be different to 35 year old woman in
Muzzafarpur looking for a Karwa Chauth outfit) to offer appropriate and versatile outfit
suggestions. Users should also be able to interact with the outfit generator to give it feedback in
terms of what they like, dont like and be able to tweak the outfits in the manner of a conversation
(Ex. I like the top, but the jhumkas are boring, give me something else).

The ultimate goal of the fashion outfit generator is to enhance the user's shopping experience on
Flipkart by providing them with personalized, trendy, and cohesive outfit ideas. Users should feel
inspired and confident in their fashion choices, knowing that the generator has considered their
preferences, browsing habits, and the latest fashion trends.


## Tech Stack

**Client:** React, MaterialUI

**Server:** NodeJs, Firebase, AppWrite

**Web Scapping:** Python, beautifulsoup

**Model:** Python, deep-learning, torch, pytorch, gradio, diffusion, stable-diffusion


## Demo Videos

| Topic             | Youtube link                                                                |
| ----------------- | ------------------------------------------------------------------ |
| FliplookAi Chrome Extension | <a href="https://www.youtube.com/watch?v=l6OxSYhazdE&t=0s"><img src="https://cloud.appwrite.io/v1/storage/buckets/64de5752e52b4ff1afe1/files/64e1e1ea3343cd8d3faf/view?project=64de56dad1e7b4e01d6c&mode=admin" width="100"></a> |
| FliplookAi UI | <a href="https://www.youtube.com/watch?v=l6OxSYhazdE&t=30s"><img src="https://cloud.appwrite.io/v1/storage/buckets/64de5752e52b4ff1afe1/files/64e1e1ea3343cd8d3faf/view?project=64de56dad1e7b4e01d6c&mode=admin" width="100"></a> |
| Image generation using Prompts | <a href="https://www.youtube.com/watch?v=l6OxSYhazdE&t=52s"><img src="https://cloud.appwrite.io/v1/storage/buckets/64de5752e52b4ff1afe1/files/64e1e1ea3343cd8d3faf/view?project=64de56dad1e7b4e01d6c&mode=admin" width="100"></a> |
| Preference matching and Customised weighted selection | <a href="https://www.youtube.com/watch?v=l6OxSYhazdE&t=104s"><img src="https://cloud.appwrite.io/v1/storage/buckets/64de5752e52b4ff1afe1/files/64e1e1ea3343cd8d3faf/view?project=64de56dad1e7b4e01d6c&mode=admin" width="100"></a> |
| Image editing using Prompts | <a href="https://www.youtube.com/watch?v=l6OxSYhazdE&t=195s"><img src="https://cloud.appwrite.io/v1/storage/buckets/64de5752e52b4ff1afe1/files/64e1e1ea3343cd8d3faf/view?project=64de56dad1e7b4e01d6c&mode=admin" width="100"></a> |
| Additional Features | <a href="https://www.youtube.com/watch?v=l6OxSYhazdE&t=222s"><img src="https://cloud.appwrite.io/v1/storage/buckets/64de5752e52b4ff1afe1/files/64e1e1ea3343cd8d3faf/view?project=64de56dad1e7b4e01d6c&mode=admin" width="100"></a> |
## Dataset
|    Source    | Link                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Web Scrapping | <a href="https://drive.google.com/drive/folders/1PDdAFBkClbyAeectIvL4PNzwWId1WmWI?usp=sharing">Link</a> |
| Kaggle | <a href="https://www.kaggle.com/datasets/paramaggarwal/fashion-product-images-dataset">Link</a> |

## Installation
### Chrome Extension
- Go to chrome extension dashboard, enable Developer mode and click on load unpacked button and upload flipkartGrid5.0 chrome extension folder. By Using this extension Id generate new OAuth 2.0 Client ID from google cloud and add it to the clientID in manifest.json
```
  "oauth2": {
    "client_id": "",      //here...
    .....
  },
```
- Initialize new Firbase App and add web credentials in firebase.js
```
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
```
### Backend
```
cd "flipkartGrid5.0 backend"
```
- Download adminSDK credentials file from firebase dashboard and add in root folder.
```
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}
``` 
- Go to <a href="https://serpapi.com/">SerpAPI Dashboard</a> and generate SerpAPI token and add it .env file.
```
API_KEY=                         //here
```
- run backend
```
npm install
nodemon start
```
### Frontend
```
cd "flipkartGrid5.0 frontend"
```
- add firebase web credentials and appwrite project_id in \src\firebaseFiles\firebase.js file
```
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("");  //here.....
```
- run frontend
```
npm install
npm start
```
### web scrapping(Dataset)
```
cd "flipkartGrid5.0 flipkart Scraping Tool"
```
- On running this Python Script images will be downloaded in /images/ folder and metadata will be written in Data.csv file.
```
python scraping.py
```
### text2img model
```
cd "flipkartGrid5.0 Model"
```
- Download <a href="https://drive.google.com/file/d/1FQmmy6wAJz0XzJj50nAc3nF_tbIMoOT7/view?usp=sharing">img2img model from Drive link</a> and add it to path \models\Stable-diffusion\ .
- Windows (NVidia-GPUs & Python 3.10.6 recommended)
```
webui-user.bat
```
### img2img using text model
```
cd "flipkartGrid5.0 Model"
```
- Run the file img2img_using_text.ipynb in colab and add the generated NgrokTunnel public URL in \flipkartGrid5.0_palakPaneer\flipkartGrid5.0 frontend\src\mainComponents\MainBody.js
```
      const imageresponse = await axios.post(
        "                                          //here....
          /process_image",
        {
          url: imageUploadedURL,
          prompt: userMagicTextInput,
        }
      );
``` 
