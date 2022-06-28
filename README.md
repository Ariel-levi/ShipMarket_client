<div id="top"></div>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn - Nati Ronen][linkedin-shield]][linkedin-nati-url]
[![LinkedIn - Ariel Levi][linkedin-shield]][linkedin-ariel-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">ShipMarket</h3>

  <p align="center">
    A delivery food platform usage for customers deliveries and store owners
    <br />
    <a href="https://github.com/Ariel-levi/ShipMarket_FrontEnd"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Ariel-levi/ShipMarket_FrontEnd/issues">Report Bug</a>
    ·
    <a href="https://github.com/Ariel-levi/ShipMarket_FrontEnd/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Our project is a delivery food platform in wich users can buy food, open a store or apllying for delivery position.

The platform consist of four panels: 
1. customers
2. stores owners 
3. deliveries
4. admin

## Main features

#### General
- Register/ Login 
  * create token
- Authentications for each panen
  * in server and client side
  * using jwt

#### Customers
- Favorites items
  * saved in the database
  * using redux-thunk
- Cart  
  * using redux
- Checkout
  * payment by react PayPal-js
- Search address
  * autocomplete search
  * using leaflet geosearch
  * debounce the search requests by hook

#### Stores owners
- Create a new store
  * pending until activation by admin
- Edit, Delete exsistent store
- Add, Edit and Delete product

#### Delivers
- Display all orders ready for shipment on the map
- Taking an order
  * customer recive a message his order has been shipped
  * using socket.io
- Setting a route to the customer address with stop at the store

#### Admin
- Access to tha all informaion
- Add, Edit and Delete users, stores, prducts and orders

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [React.js](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [Bootstrap](https://getbootstrap.com)
- [Socket.io](https://socket.io/)
- [Redux](https://redux.js.org/)
- [MongoDB](https://www.mongodb.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Clone the repo
   ```sh
   git clone https://github.com/Ariel-levi/ShipMarket_FrontEnd.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your API in `\src\services\apiService.js`
   ```js
   const API_KEY = "ENTER YOUR API";
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [ ] Add customers services chat
- [ ] To price any shipment by the estimate sipment time
- [ ] Add financial reports to the stores owners and to the deliveries

See the [open issues](https://github.com/Ariel-levi/ShipMarket_FrontEnd/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- Ariel Levi - ariellevi19981998@gmail.com
- Nati Ronen - ronennt@gmail.com

Project Link: [https://github.com/Ariel-levi/ShipMarket_FrontEnd](https://github.com/Ariel-levi/ShipMarket_FrontEnd)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Leaflet](https://leafletjs.com/reference.html)
- [Leaflet geosearch](https://smeijer.github.io/leaflet-geosearch/)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)
- [React paypal-js](https://github.com/paypal/react-paypal-js)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/Ariel-levi/ShipMarket_backEnd/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-nati-url]: www.linkedin.com/in/nati-ronen
[linkedin-ariel-url]: https://www.linkedin.com/in/ariel-levi1998/
[product-screenshot]: images/screenshot.png
