// Get quote from API using Promises

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

const showLoading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const hideLoading = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

const getQuote = () => {
  showLoading();
  new Promise(() => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl =
      "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    fetch(proxyUrl + apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // If author is blank add 'Unknown'
        if (data.quoteAuthor === "") {
          authorText.innerText = "Unknown";
        } else {
          authorText.innerHTML = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
          quoteText.classList.add("long-quote");
        } else {
          quoteText.classList.remove("long-quote");
        }
        quoteText.innerText = data.quoteText;
        hideLoading();
      })
      .catch((error) => {
        getQuote();
        console.log("whoops, no quote", error);
      });
  });
};

const tweetQuote = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
};

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();

// Get quote from API using Async Await

// const getQuote = async () => {
//   const proxyUrl = "https://cors-anywhere.herokuapp.com/";
//   const apiUrl =
//     "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
//   try {
//     const response = await fetch(proxyUrl + apiUrl);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// getQuote();
