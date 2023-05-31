//establishes a variable that holds the first element with the class name "container" from the elements of the document.
let resultsContainer = document.getElementsByClassName("container")[0];
//establishes a variable that stores the delay time
let debounceTimer;

const debounce = (func, delay) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(func, delay);
};

//instead of directly calling generateResults, we invoke debounce with an anonymous function that wraps the generateResults call.
const validateInput = (el) => {
  if (el.value === "") {
    resultsContainer.innerHTML = "<p>Type something in the above search input</p>";
  } else {
    debounce(() => generateResults(el.value, el), 300);
  }
};

//the generateResults function will be executed only after the user has finished typing for 300 milliseconds.
const generateResults = (searchValue, inputField) => {
  fetch(
    "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
      searchValue
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data.query.search;
      let numberOfResults = data.query.search.length;
      resultsContainer.innerHTML = "";
      for (let i = 0; i < numberOfResults; i++) {
        let result = document.createElement("div");
        result.classList.add("results");
        result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `;
        resultsContainer.appendChild(result);
      }
      if (inputField.value === "") {
        resultsContainer.innerHTML = "<p>Type something in the above search input</p>";
      }
    });
};
