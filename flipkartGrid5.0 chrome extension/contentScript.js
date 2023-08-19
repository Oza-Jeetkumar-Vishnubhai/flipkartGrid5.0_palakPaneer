// Create the button element
const profilebox = document.createElement("div");
profilebox.textContent = "Google Login";
profilebox.classList.add("absolute-button-Bhindi");

// Append the button to the body
document.body.appendChild(profilebox);

// on windows load fetch id and iage
window.onload = () => {
  profilebox.textContent = "loading....";
  chrome.runtime.sendMessage({ action: "getProfile" }, (response) => {
    // Pass an object with 'action' property
    if (response.status === "success") {
      // Create the img element
      const img = document.createElement("img");
      img.src = response.user.image;
      img.id = "userImageBhindi"; // Add your desired class name here
      profilebox.textContent = response.user.email;
      // Append the img to the button
      profilebox.insertBefore(img, profilebox.firstChild);
      productpaeCheck(response.user.email);
    } else {
      profilebox.textContent = response.error.error;
    }
  });
};

// function to check weather page is product or not

const productpaeCheck = (userId) => {
  // Check if the "Add to cart" button is present
  const addToCartButton = document.querySelector(
    "button._2KpZ6l._2U9uOA._3v1-ww"
  );
  // Check if the "Buy Now" button is present
  const buyNowButton = document.querySelector(
    "button._2KpZ6l._2U9uOA.ihZ75k._3AWRsL"
  );
  // Check if both buttons are present
  if (addToCartButton && buyNowButton) {
    const data = productDetails();
    if (data) {
      chrome.runtime.sendMessage(
        { action: "uploadProductData", productData: data, id: userId },
        (response) => {
          // Pass an object with 'action' property
          if (response.status === "success") {
            // Add the class to apply animation
            profilebox.classList.add("background-success");
          } else {
            // Add the class to apply animation
            profilebox.classList.add("background-error");
          }
        }
      );
    }
  }
};

//function which gives product details

const productDetails = () => {
  let brand = document.getElementsByClassName("G6XhRU").item(0).textContent;
  let title = document.getElementsByClassName("B_NuCI").item(0).textContent;
  let category =title.split(" ").slice(-1)[0].split("(")[0].trim();
  console.log(category);
  if (category === "T-Shirt") {
    let descLen = document
      .getElementsByClassName("X3BRps _13swYk")
      .item(0).childNodes;
    let image = document
      .getElementsByClassName("q6DClP")
      .item(0)
      .getAttribute("src");
    let color = title.split(" ").slice(-2)[0];
    let obj = {
      brand: brand,
      title: title,
      link: window.location.href,
      image: image,
      color: color,
      category: category,
    };
    let req = ["sleeve", "fabric", "pattern"];
    for (let i = 0; i < descLen.length; i++) {
      for (let j = 0; j < 3; j++) {
        if (
          descLen[i].childNodes[0].textContent.toLocaleLowerCase() === req[j]
        ) {
          obj[req[j].toString()] = descLen[i].childNodes[1].textContent;
        }
      }
    }
    return obj;
  } else if (category === "Jeans") {
    let descLen = document
      .getElementsByClassName("X3BRps _13swYk")
      .item(0).childNodes;
    let image = document
      .getElementsByClassName("q6DClP")
      .item(0)
      .getAttribute("src");
    let obj = {
      brand: brand,
      title: title,
      link: window.location.href,
      image: image,
      category: category,
    };
    let req = ["sleeve", "fabric", "pattern", "color"];
    for (let i = 0; i < descLen.length; i++) {
      for (let j = 0; j < req.length; j++) {
        if (
          descLen[i].childNodes[0].textContent.toLocaleLowerCase() === req[j]
        ) {
          obj[req[j].toString()] = descLen[i].childNodes[1].textContent;
        }
      }
    }
    return obj;
  } else if (category === "Trousers") {
    let descLen = document
      .getElementsByClassName("X3BRps _13swYk")
      .item(0).childNodes;
    let image = document
      .getElementsByClassName("q6DClP")
      .item(0)
      .getAttribute("src");
    let obj = {
      brand: brand,
      title: title,
      link: window.location.href,
      image: image,
      category: category,
    };
    let req = ["sleeve", "fabric", "pattern", "color"];
    for (let i = 0; i < descLen.length; i++) {
      for (let j = 0; j < req.length; j++) {
        if (
          descLen[i].childNodes[0].textContent.toLocaleLowerCase() === req[j]
        ) {
          obj[req[j].toString()] = descLen[i].childNodes[1].textContent;
        }
      }
    }
    return obj;
  } 
  else if(category === "Shirt"){
    let descLen = document
      .getElementsByClassName("X3BRps _13swYk")
      .item(0).childNodes;
    let image = document
      .getElementsByClassName("q6DClP")
      .item(0)
      .getAttribute("src");
    let obj = {
      brand: brand,
      title: title,
      link: window.location.href,
      image: image,
      category: category,
    };
    let req = ["sleeve", "fabric", "pattern", "color"];
    for (let i = 0; i < descLen.length; i++) {
      for (let j = 0; j < req.length; j++) {
        if (
          descLen[i].childNodes[0].textContent.toLocaleLowerCase() === req[j]
        ) {
          obj[req[j].toString()] = descLen[i].childNodes[1].textContent;
        }
      }
    }
    return obj;
  }
  else if(category=== "Dress"){
    let descLen = document
      .getElementsByClassName("X3BRps _13swYk")
      .item(0).childNodes;
    let image = document
      .getElementsByClassName("q6DClP")
      .item(0)
      .getAttribute("src");
    let obj = {
      brand: brand,
      title: title,
      link: window.location.href,
      image: image,
      category: category,
    };
    let req = ["length", "fabric", "pattern", "color"];
    for (let i = 0; i < descLen.length; i++) {
      for (let j = 0; j < req.length; j++) {
        if (
          descLen[i].childNodes[0].textContent.toLocaleLowerCase() === req[j]
        ) {
          obj[req[j].toString()] = descLen[i].childNodes[1].textContent;
        }
      }
    }
    return obj;
  }
  else if(category==="Saree"){
    let descLen = document
      .getElementsByClassName("X3BRps _13swYk")
      .item(0).childNodes;
    let image = document
      .getElementsByClassName("q6DClP")
      .item(0)
      .getAttribute("src");
    let obj = {
      brand: brand,
      title: title,
      link: window.location.href,
      image: image,
      category: category,
      color:title.split("(")[1].split(")")[0]
    };
    let req = ["fabric", "pattern","type"];
    for (let i = 0; i < descLen.length; i++) {
      for (let j = 0; j < req.length; j++) {
        if (
          descLen[i].childNodes[0].textContent.toLocaleLowerCase() === req[j]
        ) {
          obj[req[j].toString()] = descLen[i].childNodes[1].textContent;
        }
      }
    }
    return obj;
  }
  else {
    return false;
  }
};