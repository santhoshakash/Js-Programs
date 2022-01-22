import images from "../icons/*.png";

class InfoView {
  container = document.querySelector(".w_info");

  render(data) {
    this.data = data;
    this.container.innerHTML = "";
    this.renderHTMLElements();
  }
  renderHTMLElements() { // the data shows  in below search bar
    const data = this.data;
    const icon = document.createElement("img");
    const city = document.querySelector(".city_name");
    city.innerHTML = data.name;
    icon.src = images[data.weather[0].icon];//this will show in images in infosection
    icon.className = "w_icon p-3";
    this.container.append(icon);
    this.container.insertAdjacentHTML(
      "beforeend",
      `<div class="p-3">
        <h3>${data.weather[0].description}</h3>
        <h4>${data.main.temp}*F</h4>
        <div class="pt-3">
           <div> Humidity : ${data.main.humidity}</div>
           <div> Wind Speed : ${data.wind.speed}</div>
        </div>
       </div>`
    );
  }

  renderSpinner() {
    this.container.innerHTML = `<div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;
    console.log('santhosh');
  }
}
export default new InfoView();
