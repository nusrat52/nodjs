const fetter = (location) => {
  loading();

   
  fetch("/weather?adress=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        mesageAdder(data);
      } else {
        mesageAdder(data);
      }
    })
  }).catch(() => {
    mesageAdder({error:"Bezi internet problemleriniz var"});
  })
};

const loading = () => {
  const texts = document.querySelectorAll(".text");
  texts[0].innerHTML = "loading...";
};
const mesageAdder = ({ error, adress, temperature } = {}) => {
  const texts = document.querySelectorAll(".text");
  if (error) {
    return (texts[0].innerHTML = error);
  }

  texts[0].innerHTML=`adress: ${adress}`
  texts[1].innerHTML=`temperature: ${temperature}`
};

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = form.querySelector("input").value;
  fetter(search);
});
